import { DestroyRef, computed, inject, signal } from '@angular/core';
import { FormBuilder, type AbstractControl, type ValidatorFn } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, forkJoin } from 'rxjs';
import type { PaginatorState } from 'primeng/paginator';
import { FileDownloadService, I18nService, TenantService, ToastService } from '@reddoc/core';
import type { FilterCondition } from '@reddoc/core';
import type { BreadcrumbItem } from '@reddoc/feature-base';
import { ActiveModuleStore, currentModuleId, resolveModuleName } from '@erp/core/erp-modules';
import type { AppDict } from '@erp/i18n';
import type { MovimientoInformeService } from './movimiento-informe.service';
import type { InformeTotales, MovimientoInformeParams } from './movimiento-informe.types';
import {
  buildMovimientoInformeForm,
  buildMovimientoInformeParams,
} from './movimiento-informe.utils';

/** Filas por página. Mismo default que el resto de los listados del ERP. */
const PAGE_SIZE_DEFAULT = 25;

/**
 * Base de las páginas de la familia **nueva** de informes contables, los que
 * pegan a `/contabilidad/movimiento-informe/`.
 *
 * Todas hacen lo mismo —armar los parámetros, generar, paginar y descargar el
 * Excel— y solo cambian el informe, el nombre visible y el nombre del archivo.
 *
 * Lo que aporta:
 *  - El formulario de parámetros (`form`) con su validador de rango.
 *  - `generar()`, `onPageChange()`, `exportExcel()` y los flags de progreso.
 *  - `generated`, que distingue "todavía no generaste" de "no hay resultados".
 *  - `paramsStale`, que avisa cuando lo que se ve dejó de corresponder al
 *    formulario.
 *  - Las migas, derivadas del módulo activo.
 *
 * Lo que cada informe declara: `service`, `nombre`, `archivo` y —si necesita
 * otra regla de fechas o filtros propios— `rangeValidator()` y `extraFilters()`.
 *
 * Sin PDF: esta familia de endpoints solo sirve `lista/`, `excel/` y `totales/`.
 */
export abstract class MovimientoInformePageBase<TRow> {
  // ── Colaboradores ─────────────────────────────────────────────────────────
  private readonly fileDownload = inject(FileDownloadService);
  private readonly tenant = inject(TenantService);
  private readonly activeModule = inject(ActiveModuleStore);
  private readonly toast = inject(ToastService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly i18n = inject<I18nService<AppDict>>(I18nService);
  protected readonly fb = inject(FormBuilder);

  protected readonly t = this.i18n.t;

  // ── A declarar por cada informe ───────────────────────────────────────────

  /** Servicio del informe (declara su discriminador). */
  protected abstract readonly service: MovimientoInformeService<TRow>;

  /** Nombre visible: título de la página y última miga. */
  protected abstract get nombre(): string;

  /** Nombre base de la descarga, sin extensión (p. ej. `'balance-prueba'`). */
  protected abstract readonly archivo: string;

  /**
   * Regla de validación del rango de fechas. `undefined` deja el default de la
   * familia —ambas fechas en el mismo año, que es lo que necesitan los cinco
   * informes jerárquicos por su saldo anterior—; los informes planos, que no lo
   * calculan, pueden devolver `rangoFechas` a secas.
   */
  protected rangeValidator(): ValidatorFn | undefined {
    return undefined;
  }

  /**
   * Filtros propios del informe, además del rango de cuentas. Los informes que
   * acotan por tercero, comprobante o número los arman acá.
   */
  protected extraFilters(): readonly FilterCondition[] {
    return [];
  }

  // ── Estado ────────────────────────────────────────────────────────────────
  protected readonly form = buildMovimientoInformeForm(this.fb, this.rangeValidator());

  protected readonly rows = signal<readonly TRow[]>([]);
  protected readonly totales = signal<InformeTotales | null>(null);
  protected readonly totalCount = signal(0);
  protected readonly page = signal(0);
  protected readonly pageSize = signal(PAGE_SIZE_DEFAULT);
  protected readonly isLoading = signal(false);
  protected readonly isExportingExcel = signal(false);
  /** `false` hasta la primera generación — distingue "sin generar" de "sin datos". */
  protected readonly generated = signal(false);
  /**
   * Los parámetros cambiaron después de generar: lo que se ve en la tabla ya no
   * corresponde al formulario. No se limpia la tabla —quitarle a alguien los
   * números que está leyendo es peor— pero sí se avisa, porque el Excel sí sale
   * con los parámetros nuevos y pantalla y archivo no coincidirían.
   */
  protected readonly paramsStale = signal(false);

  // ── Derivados ─────────────────────────────────────────────────────────────

  protected readonly breadcrumbItems = computed<readonly BreadcrumbItem[]>(() => {
    const slug = this.tenant.currentSlug();
    return [
      {
        label: resolveModuleName(this.activeModule, this.t()),
        routerLink: slug ? ['/t', slug, currentModuleId(this.activeModule)] : undefined,
      },
      { label: this.nombre },
    ];
  });

  protected readonly isBusy = computed(() => this.isLoading() || this.isExportingExcel());

  /** Texto del aviso de la botonera; vacío = no hay nada que avisar. */
  protected readonly hint = computed(() =>
    this.paramsStale() ? this.t().entities.informeCuentas.paramsStale : '',
  );

  /** La descarga solo tiene sentido sobre un informe ya generado. */
  protected readonly canExport = computed(() => this.generated() && !this.isBusy());

  constructor() {
    this.watchParam(this.form);
  }

  /**
   * Suma un control a la vigilancia de `paramsStale`: cualquier cambio después
   * de generar deja viejo lo que se ve en la tabla.
   *
   * El formulario compartido ya queda vigilado. Los informes con parámetros
   * propios llaman a esto **desde su propio constructor**, no antes: los campos
   * de una subclase se inicializan después de que corre el constructor de la
   * base, así que un hook que los leyera desde acá los encontraría `undefined`.
   */
  protected watchParam(control: AbstractControl): void {
    control.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      if (this.generated()) this.paramsStale.set(true);
    });
  }

  // ── Acciones ──────────────────────────────────────────────────────────────

  /**
   * Genera el informe desde la primera página. Pide filas y totales a la vez:
   * son dos endpoints con el mismo body y la tabla necesita los dos para
   * mostrar el cuadre.
   */
  protected generar(): void {
    if (this.form.invalid || this.isBusy()) {
      this.form.markAllAsTouched();
      return;
    }
    this.page.set(0);
    this.consultar();
  }

  /**
   * Cambio de página o de tamaño. No revalida ni vuelve a pedir los totales
   * como acción aparte: `consultar()` los refresca con el mismo body, que no
   * cambió.
   */
  protected onPageChange(event: PaginatorState): void {
    if (!this.generated() || this.isBusy()) return;

    const page = event.page ?? 0;
    const pageSize = event.rows ?? this.pageSize();
    // PrimeNG reemite `onPageChange` cuando se le reprograma `first`/`rows`;
    // sin este guard cada respuesta dispararía otra consulta idéntica.
    if (page === this.page() && pageSize === this.pageSize()) return;

    this.page.set(page);
    this.pageSize.set(pageSize);
    this.consultar();
  }

  /** Excel del informe **completo**: mismo endpoint y mismo body que la consulta. */
  protected exportExcel(): void {
    if (!this.canExport()) return;
    this.isExportingExcel.set(true);
    this.fileDownload
      .download(this.service.exportUrl, {
        method: 'POST',
        body: this.service.buildBody(this.buildParams()),
        fallbackFilename: `${this.archivo}.xlsx`,
      })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.isExportingExcel.set(false)),
      )
      .subscribe({
        error: () =>
          this.toast.error(
            this.t().common.toasts.exportError.title,
            this.t().common.toasts.exportError.desc,
          ),
      });
  }

  // ── Internos ──────────────────────────────────────────────────────────────

  /** Traduce el formulario al body del informe, con los filtros propios sumados. */
  protected buildParams(): MovimientoInformeParams {
    return buildMovimientoInformeParams(this.form, this.extraFilters());
  }

  private consultar(): void {
    const params = this.buildParams();

    this.isLoading.set(true);
    forkJoin({
      pagina: this.service.list(params, this.page(), this.pageSize()),
      totales: this.service.totales(params),
    })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.isLoading.set(false)),
      )
      .subscribe({
        next: ({ pagina, totales }) => {
          this.rows.set(pagina.results);
          this.totalCount.set(pagina.count);
          this.totales.set(totales);
          this.generated.set(true);
          this.paramsStale.set(false);
        },
        error: () => {
          this.rows.set([]);
          this.totalCount.set(0);
          this.totales.set(null);
          // Se marca igual como generado: la tabla debe decir "sin resultados",
          // no "todavía no generaste" — el toast ya informa del fallo.
          this.generated.set(true);
          this.toast.error(
            this.t().common.toasts.loadError.title,
            this.t().common.toasts.loadError.desc,
          );
        },
      });
  }
}
