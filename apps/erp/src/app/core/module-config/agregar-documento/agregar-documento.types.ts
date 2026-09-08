/**
 * Tipos de la feature **agregar documento** (cruce de cartera — camino A, ERP).
 *
 * Permite traer documentos **pendientes de cruce** (cuentas por cobrar o por
 * pagar con `pendiente > 0`) como líneas contables del documento actual
 * (pago/egreso): cada documento elegido se vuelve una línea con
 * `documento_afectado`, `valor = pendiente` y la cuenta/naturaleza del cruce.
 *
 * ⚠️ Hueco del backend (verificado el 2026-09-08): la consulta responde con el
 * serializer por defecto de `documento/lista/`, así que llegan el documento, el
 * tercero y los montos, pero **faltan las dos cosas que definen la línea del
 * cruce**: la cuenta y la operación del tipo. Mientras tanto la línea nace sin
 * cuenta y el usuario la elige.
 *
 * 💡 Pedido al backend: devolver por documento la cuenta de cruce ya resuelta
 * (`cuenta_cruce_id` + `cuenta_cruce_codigo`, la de CxC o CxP según la familia)
 * y `documento_tipo_operacion`. Resolverla en el servidor se lleva puesto de
 * paso el caso de seguridad social —cuenta en el documento y no en el tipo—,
 * que el ERP anterior parchaba con un `if` por id de tipo.
 */

/** Familia de cartera que alimenta el modal: cuentas por cobrar o por pagar. */
export type CarteraTipo = 'cobrar' | 'pagar';

/**
 * Fila cruda de `POST /general/documento/lista/` para el cruce de cartera.
 *
 * Subconjunto de `DocumentoListRowBase` (`@reddoc/core`): nombres planos con un
 * guion bajo, montos como `string` con cola de decimales (`"17475000.000000"`) y
 * fechas `yyyy-MM-dd`.
 *
 * `afectado` y `pendiente` no están en el tipo compartido y sí llegan acá; se
 * declaran local hasta confirmar si los trae cualquier `lista/`.
 */
export interface DocumentoPendienteApi {
  /** Id del documento (cabecera) → futuro `documento_afectado` de la línea. */
  readonly id: number;
  readonly numero: number | string | null;
  readonly fecha: string | null;
  readonly fecha_vence: string | null;
  readonly documento_tipo_nombre: string | null;
  /** FK del tercero del documento. */
  readonly contacto: number | null;
  readonly contacto_nombre_corto: string | null;
  readonly contacto_numero_identificacion: string | null;
  readonly total: string | null;
  /** Valor ya cruzado por otros documentos. */
  readonly afectado: string | null;
  /** Valor pendiente de cruce (`total − afectado`). Siempre > 0 acá. */
  readonly pendiente: string | null;

  // ── Lo que el cruce necesita y el backend todavía NO manda (ver `cruce.rules.ts`)

  /** Operación del tipo: `1` suma cartera, `-1` la resta (p. ej. nota crédito). */
  readonly documento_tipo_operacion?: number | null;
  /** Cuenta de cruce del tipo, CxC. */
  readonly documento_tipo__cuenta_cobrar_id?: number | null;
  readonly documento_tipo__cuenta_cobrar__codigo?: string | null;
  /** Cuenta de cruce del tipo, CxP. */
  readonly documento_tipo__cuenta_pagar_id?: number | null;
  readonly documento_tipo__cuenta_pagar__codigo?: string | null;
}

/**
 * Datos de entrada del modal (`DynamicDialogConfig.data`). El consumidor (la
 * tabla de detalles contable) pasa el contacto de la cabecera para acotar los
 * pendientes y la familia de cartera que aplica a su documento.
 */
export interface AgregarDocumentoModalData {
  /** Contacto de la cabecera; filtra los pendientes (el modal puede quitarlo). */
  readonly contactoId: number | null;
  /** `'cobrar'` en el pago (recaudo); `'pagar'` en el futuro egreso. */
  readonly carteraTipo: CarteraTipo;
}
