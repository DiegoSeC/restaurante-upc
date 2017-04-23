namespace Taller.Cotizacion {
  export interface ICotizacion {
    id: number;
    createdBy: string;
    created: Date | string;
    updated: Date | string;
    estado: string;
  }
}
