namespace Taller.Cotizacion {
  export interface ISolicitudCotizacion {
    numero: number;
    idpersonal: number;
    idproveedor: number;
    estado: string;
    observacion: string;
    fecha: Date | string;
    fecha_actualizacion: Date | string;
    productos: [{
      numero_solicitud_de_cotizacion: number,
      idproducto: number,
      cantidad: number,
      id: number,
      productoNombre: string
    }],
    proveedor: {
      ruc: string,
      nombre: string,
      id: number
    }
  }
}
