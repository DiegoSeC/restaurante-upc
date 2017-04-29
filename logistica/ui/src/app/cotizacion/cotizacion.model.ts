namespace Taller.Cotizacion {
  export interface ICotizacion {
    id: number;
    createdBy: string;
    fecha_de_vencimiento: Date | string;
    updated: Date | string;
    estado: string;
    solicitudCotizacion: number;
    numero_solicitud_de_cotizacion: number;
    ruc: string;
    detalle: [{
      numero_solicitud_de_cotizacion: number,
      idproducto: number,
      cantidad: number,
      id: number,
      productoNombre: string,
      precioUnitario?: number | string,
      precio?: number | string
    }];
    idproveedor: number;
    proveedor: {
      id: number;
      ruc: string;
    },
    numero: number;
    observacion: string;
  }
}
