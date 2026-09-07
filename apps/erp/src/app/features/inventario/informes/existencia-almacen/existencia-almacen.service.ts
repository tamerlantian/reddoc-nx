import { Injectable } from '@angular/core';
import {
  InventarioInformeService,
  type InventarioInformeId,
} from '../shared/inventario-informe.service';
import type { ExistenciaAlmacen } from './existencia-almacen.model';

/**
 * Servicio HTTP del informe **Existencias por almacén**.
 *
 * Toda la mecánica —las dos acciones sobre `/inventario/informe/`, la
 * paginación, la forma de cada body— vive en `InventarioInformeService`; acá
 * solo se declara el discriminador.
 *
 * Abre el saldo por almacén: una fila por ítem y almacén, sobre
 * `InvExistencia`. El consolidado por ítem es `existencia`.
 *
 * **Columnas sin confirmar**: el schema solo declara el serializer del informe
 * por defecto, así que la fila de este se mantiene como estaba hasta que backend
 * publique sus campos. Ver `PENDIENTES.md`.
 */
@Injectable({ providedIn: 'root' })
export class ExistenciaAlmacenService extends InventarioInformeService<ExistenciaAlmacen> {
  protected readonly informe: InventarioInformeId = 'existencia_almacen';
}
