namespace Taller.Cotizacion {
  export interface ISolicitudCotizacion {
    numero: number;
    ruc: string;
    fecha: Date | string;
    proveedor: string;
    productos: [{
      cantidad: number,
      descripcion: string,
      precioUnitario: number
    }];
  }
}
