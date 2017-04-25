namespace Taller.Cotizacion {
  'use strict';

  export interface ICotizacionFactory {
    getCotizaciones: () => angular.IPromise<Array<Taller.Cotizacion.ICotizacion>>;
    getSolicitudCotizacion: () => angular.IPromise<Array<Taller.Cotizacion.ISolicitudCotizacion>>;
    setSolicitud: (solicitud: Taller.Cotizacion.ISolicitudCotizacion) => void;
    getSolicitud: () => Taller.Cotizacion.ISolicitudCotizacion;
    getCotizacion: (id: number) => angular.IPromise<Taller.Cotizacion.ICotizacion>
  }

  class CotizacionFactory implements ICotizacionFactory {
    private solicitud: Taller.Cotizacion.ISolicitudCotizacion;

    constructor(private $http: angular.IHttpService) {}

    public getCotizaciones(): angular.IPromise<Array<Taller.Cotizacion.ICotizacion>> {
      return this.$http.get('http://beta.json-generator.com/api/json/get/VJBgE04RG')
        .then(cotizaciones => cotizaciones.data)
        .catch(error => null);
    }

    public getSolicitudCotizacion(): angular.IPromise<Array<Taller.Cotizacion.ISolicitudCotizacion>> {
      return this.$http.get('http://beta.json-generator.com/api/json/get/Vkeu1ILAM')
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
      return this.$http.get('http://beta.json-generator.com/api/json/get/VyxYK5P0M')
        .then(cotizacion => cotizacion.data)
        .catch(error => null);
    }
  }

  CotizacionFactory.$inject = ['$http'];

  angular
    .module('app.cotizacion')
    .service('CotizacionFactory', CotizacionFactory);
}
