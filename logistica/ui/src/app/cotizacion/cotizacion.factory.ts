namespace Taller.Cotizacion {
  'use strict';

  export interface ICotizacionFactory {
    getCotizaciones: (q: string, cancel: any) => angular.IPromise<Array<Taller.Cotizacion.ICotizacion>>;
    getSolicitudCotizacion: (q, cancel) => angular.IPromise<Array<Taller.Cotizacion.ISolicitudCotizacion>>;
    setSolicitud: (solicitud: Taller.Cotizacion.ISolicitudCotizacion) => void;
    getSolicitud: () => Taller.Cotizacion.ISolicitudCotizacion;
    getCotizacion: (id: number) => angular.IPromise<Taller.Cotizacion.ICotizacion>;
    createCotizacion: (cotizacion: Taller.Cotizacion.ICotizacion) => angular.IPromise<Taller.Cotizacion.ICotizacion>;
    updateCotizacion: (cotizacion: Taller.Cotizacion.ICotizacion) => angular.IPromise<Taller.Cotizacion.ICotizacion>;
  }

  class CotizacionFactory implements ICotizacionFactory {
    private solicitud: Taller.Cotizacion.ISolicitudCotizacion;
    private baseUrl = 'http://localhost:8000'; // 'http://190.85.228.7/rest-restaurante/public'

    constructor(private $http: angular.IHttpService) {}

    public getCotizaciones(q = null, cancel): angular.IPromise<Array<Taller.Cotizacion.ICotizacion>> {
      return this.$http.get(`${this.baseUrl}/cotizaciones`, {params: {q: q}, timeout: cancel.promise})
        .then(cotizaciones => cotizaciones.data)
        .catch(error => []);
    }

    public getSolicitudCotizacion(q = null, cancel): angular.IPromise<Array<Taller.Cotizacion.ISolicitudCotizacion>> {
      return this.$http.get(`${this.baseUrl}/solicitudes`, {params: {q: q}, timeout: cancel.promise})
        .then(solicitud => solicitud.data)
        .catch(error => []);
    }

    public setSolicitud(solicitud: Taller.Cotizacion.ISolicitudCotizacion): void {
      this.solicitud = solicitud;
    }

    public getSolicitud(): Taller.Cotizacion.ISolicitudCotizacion {
      return this.solicitud;
    }

    public getCotizacion(id: number): angular.IPromise<Taller.Cotizacion.ICotizacion> {
      return this.$http.get(`${this.baseUrl}/cotizacion/${id}`)
        .then(cotizacion => cotizacion.data)
        .catch(error => null);
    }

    public createCotizacion(cotizacion: Taller.Cotizacion.ICotizacion): angular.IPromise<Taller.Cotizacion.ICotizacion> {
      return this.$http.post(`${this.baseUrl}/cotizacion`, cotizacion)
        .then(res => res.data)
        .catch(error => null);
    }

    public updateCotizacion(cotizacion: Taller.Cotizacion.ICotizacion): angular.IPromise<Taller.Cotizacion.ICotizacion> {
      return this.$http.put(`${this.baseUrl}/cotizacion/${cotizacion.numero}`, cotizacion)
        .then(res => res.data)
        .catch(error => null);
    }
  }

  CotizacionFactory.$inject = ['$http'];

  angular
    .module('app.cotizacion')
    .service('CotizacionFactory', CotizacionFactory);
}
