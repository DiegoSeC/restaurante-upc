namespace Taller.OrdenCompra {
  export interface IOrdeCompra {
    numero: number;
    fecha: Date | string;
    observacion: string;
    idproveedor: number;
    estado: string;
    fecha_actualizacion: Date | string;
    numero_cotizacion: number;
    error?: {
      message: string
    }
  }
}
