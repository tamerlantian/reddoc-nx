import type { FormControl, FormGroup } from '@angular/forms';
import type { BackendFilter, ErpSelectOption } from '@reddoc/core';

/**
 * Contrato de los **informes agregados sobre el movimiento contable**, servidos
 * por `/contabilidad/movimiento-informe/` en tres acciones con el **mismo body**:
 * `lista/` (paginada), `excel/` y `totales/`.
 *
 * Es la familia nueva, la que reemplaza a `informe-cuentas.types.ts` —aquella
 * pide `{ parametros }` a `/contabilidad/movimiento/informe-*` y recibe el
 * informe entero—. Las diferencias que definen todo lo demás:
 *
 * - El informe se elige con el discriminador `informe` del body.
 * - **Pagina** (`{ count, results }`), y por eso los totales de cuadre salen de
 *   una acción aparte: sumar la página daría el total de 25 filas.
 * - Acota con los **filtros dinámicos** genéricos (`{propiedad, operador,
 *   valor}`), aplicados *antes* de agrupar, así que recortan por igual el saldo
 *   anterior, el movimiento del rango y el detalle.
 * - **No acepta `ordenamientos`**: sale siempre por código de cuenta. Dentro de
 *   una cuenta el orden lo fija el informe, y reordenar por encima despegaría el
 *   detalle de su cuenta.
 */

/**
 * Los nueve informes del enum `informe`. Cinco son **jerárquicos** —recorren el
 * plan de cuentas con más o menos detalle colgando de cada auxiliar— y cuatro
 * son **planos**, sin jerarquía ni subtotales.
 */
export type InformeId =
  | 'auxiliar_contacto'
  | 'auxiliar_cuenta'
  | 'auxiliar_general'
  | 'balance_prueba'
  | 'balance_prueba_contacto'
  | 'bases'
  | 'certificado_retencion'
  | 'estado_resultados'
  | 'estado_situacion_financiera';

/**
 * Qué es cada fila de un informe jerárquico. **Es lo único que distingue un
 * subtotal de una cuenta**, así que la tabla no puede ignorarlo: pintarlo todo
 * igual haría leer los importes duplicados, porque los subtotales están hechos
 * de los auxiliares que vienen debajo.
 *
 * Los cuatro primeros son los subtotales del plan; `AUXILIAR` es la cuenta de
 * movimiento —la única que trae `cuenta_id`— y `TERCERO` / `MOVIMIENTO` son el
 * detalle que cuelga de ella según el informe.
 */
export type InformeFilaTipo =
  | 'CLASE'
  | 'GRUPO'
  | 'CUENTA'
  | 'SUBCUENTA'
  | 'AUXILIAR'
  | 'TERCERO'
  | 'MOVIMIENTO';

/**
 * Fila base de los informes jerárquicos (`ConMovimientoInformeBalance`). Los
 * montos llegan como **string decimal** (`"120600.000000"`); se formatean con
 * `formatCop`, que ya los normaliza.
 */
export interface InformeSaldosRow {
  readonly tipo: InformeFilaTipo;
  /** Solo las filas de tipo `AUXILIAR` lo traen; en los subtotales es `null`. */
  readonly cuenta_id: number | null;
  readonly codigo: string;
  readonly nombre: string;
  readonly saldo_anterior: string;
  readonly debito: string;
  readonly credito: string;
  readonly saldo_final: string;
}

/** Fila de los informes que abren el saldo **por tercero**. */
export interface InformeContactoRow extends InformeSaldosRow {
  readonly contacto_id: number | null;
  readonly identificacion: string | null;
  readonly contacto: string | null;
}

/**
 * Referencia al asiento que originó la fila. La traen los tres auxiliares en sus
 * filas de tipo `MOVIMIENTO`; en los subtotales y en las de tipo `TERCERO` viene
 * `null`.
 */
export interface InformeMovimientoRef {
  readonly movimiento_id: number | null;
}

/**
 * Fila del **auxiliar de cuenta**: el plan de cuentas con una fila por asiento
 * del rango colgando de cada auxiliar.
 *
 * Es lo mínimo que puede ser una fila de detalle: identifica el asiento **solo
 * por su id**, sin comprobante, número ni fecha. Ver la nota de la página sobre
 * ese hueco.
 */
export interface InformeAuxiliarCuentaRow extends InformeSaldosRow, InformeMovimientoRef {}

/**
 * Fila del **auxiliar por contacto**: cada tercero seguido de sus asientos, así
 * que suma la referencia al movimiento sobre las columnas del tercero.
 */
export interface InformeAuxiliarContactoRow extends InformeContactoRow, InformeMovimientoRef {}

/**
 * Fila del **auxiliar general**, la más ancha de la familia: sobre las del
 * auxiliar por contacto suma cómo se identifica el asiento de cara al usuario.
 */
export interface InformeMovimientoRow extends InformeAuxiliarContactoRow {
  readonly comprobante: string | null;
  readonly numero: number | string | null;
  /** Fecha del movimiento (`yyyy-MM-dd`). */
  readonly fecha: string | null;
}

/**
 * Lo que acepta la tabla compartida: una fila jerárquica que **puede** traer los
 * datos del tercero y del movimiento. Qué columnas se pintan lo decide el
 * informe (por bloques), no la fila.
 */
export type InformeTableRow = InformeSaldosRow & Partial<InformeMovimientoRow>;

/**
 * Totales del informe **completo**, servidos por `totales/`. Suman solo las
 * filas de tipo `AUXILIAR`: los subtotales y el detalle están hechos de ellas,
 * así que sumarlo todo multiplicaría el balance.
 */
export interface InformeTotales {
  readonly saldo_anterior: string;
  readonly debito: string;
  readonly credito: string;
  readonly saldo_final: string;
}

/**
 * Body del informe, sin el discriminador `informe` (lo pone el servicio).
 * `fecha_desde` y `fecha_hasta` son obligatorias para el backend.
 */
export interface MovimientoInformeParams {
  readonly fecha_desde: string;
  readonly fecha_hasta: string;
  /**
   * `true` omite las cuentas que quedan en ceros en las cuatro columnas, con su
   * detalle. El default del backend es `false`; se manda explícito para que el
   * checkbox mande siempre y no dependa de la ausencia de la clave.
   *
   * En los cuatro informes planos no aplica y el backend lo ignora.
   */
  readonly solo_con_saldo: boolean;
  readonly filtros: readonly BackendFilter[];
}

/**
 * Formulario de parámetros común. El rango de cuentas guarda la opción completa
 * del selector porque el filtro viaja por **código** (`cuenta__codigo`), no por
 * id.
 *
 * No hay `incluir_cierre`: el backend decide el tratamiento del cierre y no lo
 * expone como parámetro (los asientos de cierre entran al saldo anterior pero
 * nunca a las columnas del rango ni al detalle).
 */
export type MovimientoInformeForm = FormGroup<{
  fecha_desde: FormControl<Date>;
  fecha_hasta: FormControl<Date>;
  cuenta_desde: FormControl<ErpSelectOption | null>;
  cuenta_hasta: FormControl<ErpSelectOption | null>;
  solo_con_saldo: FormControl<boolean>;
}>;

/** Un estado vacío: título y pista. Espeja la forma de las claves i18n. */
export interface InformeEmptyCopy {
  readonly title: string;
  readonly sub: string;
}

/**
 * Los dos estados vacíos de un informe. "Todavía no generaste" y "no hay
 * resultados" se leen muy distinto, así que cada informe aporta su propio par
 * en vez de compartir un texto genérico.
 */
export interface InformeEmptyCopySet {
  readonly notGenerated: InformeEmptyCopy;
  readonly noData: InformeEmptyCopy;
}
