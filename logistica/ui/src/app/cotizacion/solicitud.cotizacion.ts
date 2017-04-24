namespace Taller.Cotizacion {
  export interface ISolicitudCotizacion {
    codigo: number;
    ruc: string;
    created: Date | string;
    nombreProveedor: string;
    productos: [{
      cantidad: number,
      descripcion: string,
      precioUnitario: number
    }];
  }
}
