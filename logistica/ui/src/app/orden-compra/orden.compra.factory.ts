namespace Taller.OrdenCompra {
  'use strict';

  export interface IOrdenCompraFactory {
    getOrdenesCompra: (q: string, cancel) => angular.IPromise<Array<Taller.OrdenCompra.IOrdeCompra>>;
    createOrden: (orden) => angular.IPromise<Taller.OrdenCompra.IOrdeCompra>;
    getBaseUrl: () => string;
    getOrden: (id: number) => angular.IPromise<Taller.OrdenCompra.IOrdeCompra>;
    updateOrden: (orden: Taller.OrdenCompra.IOrdeCompra) => angular.IPromise<Taller.OrdenCompra.IOrdeCompra>;
  }

  class OrdenCompraFactory implements IOrdenCompraFactory {
    private baseUrl = 'http://190.85.228.7/rest-restaurante/public'; // 'http://localhost:8000';

    constructor(public $http: angular.IHttpService) {}

    public createOrden(orden): angular.IPromise<Taller.OrdenCompra.IOrdeCompra> {
      return this.$http.post(`${this.baseUrl}/orden`, orden)
        .then(res => res.data)
        .catch(error => {});
    }

    public getBaseUrl() {
      return this.baseUrl;
    }

    public getOrdenesCompra(q = null, cancel): angular.IPromise<Array<Taller.OrdenCompra.IOrdeCompra>> {
      return this.$http.get(`${this.baseUrl}/ordenes`, {params: {q: q}, timeout: cancel.promise})
        .then(ordenes => ordenes.data)
        .catch(error => []);
    }

    public getOrden(id: number): angular.IPromise<Taller.OrdenCompra.IOrdeCompra> {
      return this.$http.get(`${this.baseUrl}/orden/${id}`)
        .then(orden => orden.data)
        .catch(error => null);
    }

    public updateOrden(orden: Taller.OrdenCompra.IOrdeCompra): angular.IPromise<Taller.OrdenCompra.IOrdeCompra> {
      return this.$http.put(`${this.baseUrl}/orden/${orden.numero}`, orden)
        .then(res => res.data)
        .catch(error => null);
    }
  }

  OrdenCompraFactory.$inject = ['$http'];

  angular
    .module('app.ordenCompra')
    .service('OrdenCompraFactory', OrdenCompraFactory);
}
