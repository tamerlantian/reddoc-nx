/**
 * Fila del informe **Existencias por almacén**
 * (`POST /inventario/informe/lista/`, `informe: 'existencia_almacen'`).
 *
 * A diferencia de `Existencia` (una fila por ítem, saldo consolidado), acá el
 * grano es **ítem × almacén**: el mismo ítem aparece una vez por cada almacén
 * donde tiene movimiento.
 *
 * ⚠️ **Los nombres de los campos son un supuesto, y hay evidencia en contra.**
 * Vienen del lookup de Django del ERP legacy (`item__nombre`), pero el único
 * serializer de esta familia que el schema sí declara —`InvExistenciaInforme`,
 * el del informe `existencia`— usa nombres **planos** (`codigo`, `nombre`). Si
 * este informe sigue esa convención, las columnas con doble guion bajo salen
 * **vacías**: `<lib-data-table>` resuelve el valor con `row[field]` plano.
 * Pendiente de confirmar la lista de campos con backend.
 */
export interface ExistenciaAlmacen {
  readonly id: number;
  readonly item__nombre: string | null;
  readonly almacen__nombre: string | null;
  /** Unidades en ese almacén. */
  readonly existencia: number | string | null;
  /** Unidades comprometidas en remisiones desde ese almacén. */
  readonly remision: number | string | null;
  /** Existencia menos remisión. */
  readonly disponible: number | string | null;
}
