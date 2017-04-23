namespace Taller.Cotizacion {
  'use strict';

  export interface ICotizacionFactory {
    getCotizaciones: () => angular.IPromise<Array<Taller.Cotizacion.ICotizacion>>;
  }

  class CotizacionFactory implements ICotizacionFactory {
    constructor(private $http: angular.IHttpService) {}

    public getCotizaciones(): angular.IPromise<Array<Taller.Cotizacion.ICotizacion>> {
      return this.$http.get('http://beta.json-generator.com/api/json/get/VJBgE04RG')
        .then(cotizaciones => cotizaciones.data)
        .catch(error => null);
    }
  }

  CotizacionFactory.$inject = ['$http'];

  angular
    .module('app.cotizacion')
    .service('CotizacionFactory', CotizacionFactory);
}
