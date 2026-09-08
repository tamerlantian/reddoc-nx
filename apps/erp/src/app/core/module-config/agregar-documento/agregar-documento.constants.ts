import type { FilterField } from '@reddoc/core';

/**
 * Campos filtrables del modal de **agregar documento**. Valen para las dos
 * familias —CxC y CxP—: filtran sobre `documento`, el mismo modelo en ambas.
 *
 * Los nombres son rutas del ORM y las FK se filtran por `_id` (convención del
 * `lista/`, opuesta a la de escritura). `pendiente` no se ofrece: el servicio ya
 * lo fija en `> 0` como filtro base y repetirlo choca condiciones en el body.
 */
export const AGREGAR_DOCUMENTO_FILTER_FIELDS: readonly FilterField[] = [
  { name: 'id', displayNameKey: 'documentAdd.filters.id', type: 'number' },
  { name: 'numero', displayNameKey: 'documentAdd.columns.numero', type: 'number' },
  { name: 'fecha', displayNameKey: 'documentAdd.columns.fecha', type: 'date' },
  { name: 'fecha_vence', displayNameKey: 'documentAdd.columns.fechaVence', type: 'date' },
  {
    name: 'documento_tipo_id',
    displayNameKey: 'documentAdd.filters.documentoTipoId',
    type: 'number',
  },
  { name: 'documento_tipo__nombre', displayNameKey: 'documentAdd.columns.tipo', type: 'string' },
  {
    name: 'contacto__nombre_corto',
    displayNameKey: 'documentAdd.columns.contacto',
    type: 'string',
  },
  {
    name: 'contacto__numero_identificacion',
    displayNameKey: 'documentAdd.filters.identificacion',
    type: 'string',
  },
];
