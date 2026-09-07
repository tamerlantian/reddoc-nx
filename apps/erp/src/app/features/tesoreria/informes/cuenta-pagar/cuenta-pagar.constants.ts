import type { ColumnDef, FilterField } from '@reddoc/core';
import type { ToolbarAction } from '@reddoc/feature-base';

export const CUENTA_PAGAR_FILTERS_STORAGE_KEY = 'cuenta-pagar:filters:v1';

/**
 * Columnas del informe, en el orden del informe original: identificación del
 * documento (tipo, número, fecha, vencimiento), del contacto y los montos
 * (subtotal, impuesto, total, afectado, pendiente).
 *
 * La identificación del tercero va **antes** que su nombre, como en el resto de
 * los informes del ERP: es el dato por el que se lo busca.
 */
export const CUENTA_PAGAR_COLUMNS: readonly ColumnDef[] = [
  {
    field: 'id',
    headerKey: 'entities.cuentaPagar.columns.id',
    type: 'number',
    width: '70px',
    align: 'right',
  },
  {
    field: 'documento_tipo_nombre',
    headerKey: 'entities.cuentaPagar.columns.documentoTipo',
    type: 'text',
    width: '140px',
  },
  {
    field: 'numero',
    headerKey: 'entities.cuentaPagar.columns.numero',
    type: 'text',
    width: '110px',
  },
  {
    field: 'fecha',
    headerKey: 'entities.cuentaPagar.columns.fecha',
    type: 'date',
    width: '110px',
  },
  {
    field: 'fecha_vence',
    headerKey: 'entities.cuentaPagar.columns.fechaVence',
    type: 'date',
    width: '110px',
  },
  {
    field: 'contacto_numero_identificacion',
    headerKey: 'entities.cuentaPagar.columns.identificacion',
    type: 'text',
    width: '130px',
  },
  {
    // `contacto_nombre`, no `contacto_nombre_corto`: es lo que devuelve el
    // informe. Con el nombre viejo la columna salía vacía.
    field: 'contacto_nombre',
    headerKey: 'entities.cuentaPagar.columns.contacto',
    type: 'text',
  },
  {
    field: 'subtotal',
    headerKey: 'entities.cuentaPagar.columns.subtotal',
    type: 'currency',
    width: '130px',
    align: 'right',
  },
  {
    field: 'impuesto',
    headerKey: 'entities.cuentaPagar.columns.impuesto',
    type: 'currency',
    width: '120px',
    align: 'right',
  },
  {
    field: 'total',
    headerKey: 'entities.cuentaPagar.columns.total',
    type: 'currency',
    width: '130px',
    align: 'right',
  },
  {
    field: 'afectado',
    headerKey: 'entities.cuentaPagar.columns.afectado',
    type: 'currency',
    width: '130px',
    align: 'right',
  },
  {
    field: 'pendiente',
    headerKey: 'entities.cuentaPagar.columns.pendiente',
    type: 'currency',
    width: '130px',
    align: 'right',
  },
];

/** Campos por los que se puede filtrar (columnas descriptivas; no los montos calculados). */
export const CUENTA_PAGAR_FILTER_FIELDS: readonly FilterField[] = [
  { name: 'id', displayNameKey: 'entities.cuentaPagar.columns.id', type: 'number' },
  { name: 'numero', displayNameKey: 'entities.cuentaPagar.columns.numero', type: 'string' },
  { name: 'fecha', displayNameKey: 'entities.cuentaPagar.columns.fecha', type: 'date' },
  {
    name: 'documento_tipo_id',
    displayNameKey: 'entities.cuentaPagar.columns.documentoTipo',
    type: 'number',
  },
  {
    name: 'documento_tipo_nombre',
    displayNameKey: 'entities.cuentaPagar.columns.documentoTipo',
    type: 'string',
  },
  {
    // TODO(backend): sin confirmar. El valor anterior (`contacto_nombre_corto`)
    // no existe en la respuesta del informe, así que estaba mal con cualquier
    // criterio; se alinea al nombre que sí devuelve. Si la whitelist usara rutas
    // ORM sería `contacto__nombre_corto`. Un filtro fuera de la whitelist no da
    // error: devuelve el informe sin filtrar.
    name: 'contacto_nombre',
    displayNameKey: 'entities.cuentaPagar.columns.contacto',
    type: 'string',
  },
  {
    name: 'contacto_numero_identificacion',
    displayNameKey: 'entities.cuentaPagar.columns.identificacion',
    type: 'string',
  },
];

/**
 * Acciones trailing del toolbar. Al ser un informe de solo lectura, el dropdown
 * "Acciones" solo ofrece descargar el Excel (sin nuevo/importar). Se mantiene el
 * grupo para seguir el estándar de los listados (ej. cuenta-cobrar).
 */
export const CUENTA_PAGAR_TRAILING_ACTIONS: readonly ToolbarAction[] = [
  {
    id: 'actions',
    labelKey: 'common.actions.actions',
    iconClass: '',
    children: [
      { id: 'export-excel', labelKey: 'common.actions.exportExcel', iconClass: 'pi pi-file-excel' },
    ],
  },
];
