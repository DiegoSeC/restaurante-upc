namespace Taller.Cotizacion {
  'use strict';

  export interface ICotizacionFactory {
    getCotizaciones: () => angular.IPromise<Array<Taller.Cotizacion.ICotizacion>>;
    getSolicitudCotizacion: () => angular.IPromise<Array<Taller.Cotizacion.ISolicitudCotizacion>>;
    setSolicitud: (solicitud: Taller.Cotizacion.ISolicitudCotizacion) => void;
    getSolicitud: () => Taller.Cotizacion.ISolicitudCotizacion;
    getCotizacion: (id: number) => angular.IPromise<Taller.Cotizacion.ICotizacion>;
    createCotizacion: (cotizacion: Taller.Cotizacion.ICotizacion) => angular.IPromise<Taller.Cotizacion.ICotizacion>;
    updateCotizacion: (cotizacion: Taller.Cotizacion.ICotizacion) => angular.IPromise<Taller.Cotizacion.ICotizacion>;
  }

  class CotizacionFactory implements ICotizacionFactory {
    private solicitud: Taller.Cotizacion.ISolicitudCotizacion;

    constructor(private $http: angular.IHttpService) {}

    public getCotizaciones(): angular.IPromise<Array<Taller.Cotizacion.ICotizacion>> {
      return this.$http.get('http://localhost:8000/cotizaciones')
        .then(cotizaciones => cotizaciones.data)
        .catch(error => null);
    }

    public getSolicitudCotizacion(): angular.IPromise<Array<Taller.Cotizacion.ISolicitudCotizacion>> {
      return this.$http.get('http://190.85.228.7/restaurante/api/solicitud_de_cotizacion/listado')
        .then(solicitud => solicitud.data)
        .catch(error => null);
    }

    public setSolicitud(solicitud: Taller.Cotizacion.ISolicitudCotizacion): void {
      this.solicitud = solicitud;
    }

    public getSolicitud(): Taller.Cotizacion.ISolicitudCotizacion {
      return this.solicitud;
    }

    public getCotizacion(id: number): angular.IPromise<Taller.Cotizacion.ICotizacion> {
      return this.$http.get('http://190.85.228.7/restaurante/api/buscar/' + id)
        .then(cotizacion => cotizacion.data)
        .catch(error => null);
    }

    public createCotizacion(cotizacion: Taller.Cotizacion.ICotizacion): angular.IPromise<Taller.Cotizacion.ICotizacion> {
      return this.$http.post('http://190.85.228.7/restaurante/api/cotizacion/add', cotizacion)
        .then(res => res.data)
        .catch(error => null);
    }

    public updateCotizacion(cotizacion: Taller.Cotizacion.ICotizacion): angular.IPromise<Taller.Cotizacion.ICotizacion> {
      return this.$http.put('http://190.85.228.7/restaurante/api/cotizacion/edit', cotizacion)
        .then(res => res.data)
        .catch(error => null);
    }
  }

  CotizacionFactory.$inject = ['$http'];

  angular
    .module('app.cotizacion')
    .service('CotizacionFactory', CotizacionFactory);
}
