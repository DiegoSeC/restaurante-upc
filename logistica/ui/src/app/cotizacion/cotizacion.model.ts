namespace Taller.Cotizacion {
  export interface ICotizacion {
    id: number;
    createdBy: string;
    fecha: Date | string;
    updated: Date | string;
    estado: string;
    solicitudCotizacion: number;
    ruc: string;
    productos: [{
      cantidad: number | string,
      descripcion: string,
      precioUnitario: number | string
    }];
  }
}
