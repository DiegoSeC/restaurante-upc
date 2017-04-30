namespace Taller.OrdenCompra {
  'use strict';

  class DashboardController implements angular.IComponentController {
    static $inject = ['$stateParams', 'OrdenCompraFactory', '$q'];

    public success: boolean;
    public numero: string;
    public $cancel: angular.IDeferred<boolean>;
    public currentDate: Date;
    public q: string;

    public ordenes: Array<Taller.OrdenCompra.IOrdeCompra>;

    constructor(public $stateParams: angular.ui.IStateParamsService,
                public OrdenCompraFactory: IOrdenCompraFactory,
                public $q: angular.IQService) {

      this.success = this.$stateParams.success;
      this.numero = this.$stateParams.id;

      this.$cancel = this.$q.defer();
      this.currentDate = new Date();

      this.getOrdenes();
    }

    getOrdenes(search = null) {
      return this.OrdenCompraFactory.getOrdenesCompra(search, this.$cancel)
        .then(ordenes => {
          ordenes.map(orden => {
            orden.fecha = new Date(orden.fecha);
            orden.fecha_actualizacion = new Date(orden.fecha_actualizacion);
          });
          this.ordenes = ordenes;
        });
    }

    searchOrdenes() {
      if(this.$cancel) {
        this.$cancel.resolve(true);
      }

      this.$cancel = this.$q.defer();
      this.getOrdenes(this.q);
    }
  }

  angular
    .module('app.ordenCompra')
    .component('dashboard', {
      bindings: {},
      controller: DashboardController,
      controllerAs: 'd',
      template: require('./dashboard.html')
    });
}
