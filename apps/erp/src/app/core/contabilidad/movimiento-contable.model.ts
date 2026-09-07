/** Endpoint del libro de movimientos contables. */
export const MOVIMIENTO_ENDPOINT = '/contabilidad/movimiento/';

/**
 * Serializador de la exportación a Excel del libro. Lo declaraba igual el ERP
 * legacy (`serializador: 'informe_movimiento'` + `excel_informe: 'True'`).
 *
 * TODO(backend): confirmar que `/contabilidad/movimiento/excel/` lo acepte en el
 * body del POST (el legacy lo mandaba como query param de un GET).
 */
export const MOVIMIENTO_SERIALIZADOR = 'informe_movimiento';

/**
 * Contrato de lectura del **movimiento contable**: la línea ya contabilizada del
 * libro, tal como la sirve el serializador `lista` de `contabilidad/movimiento/`.
 *
 * Vive en `core/` y no en el feature de movimientos porque lo leen dos pantallas
 * que no se conocen: la consulta del libro (`features/contabilidad/informes/movimiento`) y
 * el diálogo "Contabilidad" de las fichas de detalle (`core/components/
 * contabilidad-dialog`), que muestra las líneas de un solo documento.
 *
 * Los nombres llegan con **doble guion bajo** porque el serializador aplana las
 * relaciones (`contacto__nombre_corto`, `cuenta__codigo`…). Se conservan tal
 * cual: es una consulta de solo lectura, no hay formulario que mapear, y
 * renombrarlos obligaría a un mapper que solo existiría para maquillar.
 *
 * ⚠️ Contrato **supuesto** a partir del ERP legacy (nombres y tipos), sin
 * verificar contra el backend. Y hay un riesgo concreto: el ERP anterior, sobre
 * este mismo recurso, lee la respuesta con **un solo** guion bajo
 * (`contacto_nombre_corto`, `cuenta_codigo`…). Acá se usa el doble porque así lo
 * declara el listado de movimientos del ERP nuevo, que consulta por `…/lista/`
 * —una ruta que el legacy no tiene—. Si el serializador de `lista/` aplanara
 * como el del listado viejo, estas columnas saldrían vacías; el fix sería
 * renombrarlas acá, en un solo lugar.
 */
export interface Movimiento {
  readonly id: number;
  /** Consecutivo del documento que originó el movimiento. */
  readonly numero: number | null;
  readonly fecha: string | null;
  readonly comprobante__nombre: string | null;
  readonly contacto__nombre_corto: string | null;
  /** Código de la cuenta imputada (no su id). */
  readonly cuenta__codigo: string | null;
  /**
   * Centro de costo. El backend lo llama `grupo` porque así se llamaba en el ERP
   * anterior; en este ERP el concepto es el centro de costo.
   */
  readonly grupo__nombre: string | null;
  readonly debito: string | number | null;
  readonly credito: string | number | null;
  readonly base: string | number | null;
  readonly detalle: string | null;
}
