import type { FormControl, FormGroup } from '@angular/forms';
import type { ErpSelectOption } from '@reddoc/core';

/**
 * Piezas comunes de la familia **vieja** de informes contables, la que pide
 * `{ parametros }` a `/contabilidad/movimiento/informe-*`.
 *
 * Le quedan **dos** consumidores: los dos *estados financieros*, que solo mandan
 * el periodo. Todo lo demás ya migró a `/contabilidad/movimiento-informe/` (ver
 * `movimiento-informe.*` y `PENDIENTES.md` §0), y con ello se fueron de acá los
 * tipos de fila, la tabla compartida y los parámetros con tercero.
 *
 * Cuando migren esos dos, este archivo y sus hermanos
 * (`informe-cuentas.service.ts`, `informe-cuentas-page.base.ts`,
 * `informe-cuentas.utils.ts` y `<app-informe-cuentas-params>`) se borran enteros
 * — y con ellos `InformeCuentasParams`, `buildRangoParams` y compañía, que hoy
 * solo se sostienen entre sí.
 *
 * Todos comparten la misma forma, distinta a la del resto de listados del ERP:
 *
 * - Se piden con `POST` y un objeto **`parametros`**, no con
 *   `{ filtros, ordenamientos }`.
 * - La respuesta es `{ registros }` **sin paginar ni contar**: el informe se
 *   entrega completo porque el usuario necesita ver los totales cuadrados.
 * - No hay "listado inicial": la página arranca vacía y el usuario **genera** el
 *   reporte con los parámetros que eligió.
 *
 * Lo único que cambia entre ellos es el endpoint y, en algunos, parámetros
 * extra (contacto, comprobante). Por eso el tipo de parámetros de acá es la
 * base: cada informe lo extiende si necesita más.
 */

/**
 * Lo mínimo que declara **todo** informe contable: el periodo. Es lo único que
 * mandan los estados financieros, que cubren las clases que les corresponden y
 * no un rango elegido a mano.
 */
export interface InformePeriodoParams {
  /** Inicio del periodo (`yyyy-MM-dd`). */
  readonly fecha_desde: string;
  /** Fin del periodo (`yyyy-MM-dd`). */
  readonly fecha_hasta: string;
}

/**
 * Periodo + rango de cuentas. Los que además ofrecen las dos banderas usan
 * `InformeCuentasParams`.
 */
export interface InformeCuentasRangoParams extends InformePeriodoParams {
  /** Extremos del rango de cuentas (opcional). El backend recibe id y código. */
  readonly cuenta_desde: number | null;
  readonly cuenta_hasta: number | null;
  readonly cuenta_codigo_desde: string;
  readonly cuenta_codigo_hasta: string;
}

/** Parámetros comunes. Viajan dentro de `{ parametros }` en el body del POST. */
export interface InformeCuentasParams extends InformeCuentasRangoParams {
  /** Incluir los movimientos del comprobante de cierre del periodo. */
  readonly incluir_cierre: boolean;
  /** Ocultar las cuentas que no tuvieron movimiento en el rango. */
  readonly cuenta_con_movimiento: boolean;
}

/**
 * Fila de los **estados financieros** (resultados y situación financiera): una
 * cuenta con su saldo, ubicada en el plan por clase y grupo.
 *
 * Los dos informes comparten forma exacta, por eso el tipo y la tabla viven
 * acá. `debito` y `credito` los declaraba el ERP anterior pero su tabla no los
 * mostraba; se omiten hasta saber si el backend los manda.
 */
export interface EstadoFinancieroRow {
  readonly cuenta_clase_nombre: string | null;
  readonly cuenta_grupo_nombre: string | null;
  readonly cuenta_codigo: string | null;
  readonly cuenta_nombre: string | null;
  readonly saldo: number | string | null;
}

/** Respuesta de los endpoints de informe: el resultado completo, sin envelope paginado. */
export interface InformeContableResponse<TRow> {
  readonly registros: readonly TRow[];
}

/** Formulario de parámetros. Las cuentas guardan la opción completa del selector. */
export type InformeCuentasForm = FormGroup<{
  fecha_desde: FormControl<Date>;
  fecha_hasta: FormControl<Date>;
  incluir_cierre: FormControl<boolean>;
  cuenta_con_movimiento: FormControl<boolean>;
  cuenta_desde: FormControl<ErpSelectOption | null>;
  cuenta_hasta: FormControl<ErpSelectOption | null>;
}>;
