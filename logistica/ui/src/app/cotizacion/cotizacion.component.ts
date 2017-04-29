namespace Taller.Cotizacion {
  'use strict';

  class CotizacionDashboardController implements ng.IComponentController {
    static $inject = ['CotizacionFactory', '$stateParams', '$scope', '$q'];

    public currentDate: Date;
    public cotizaciones: Array<Taller.Cotizacion.ICotizacion>;

    public success: boolean;
    public $watcher;
    public q;
    public $cancel: angular.IDeferred<boolean>;

    constructor(public CotizacionFactory: ICotizacionFactory,
                public $stateParams: angular.ui.IStateParamsService,
                public $scope: angular.IScope,
                public $q: angular.IQService) {
      console.log('Starting Cotizacion Dashboard', $stateParams);
      this.currentDate = new Date();
      this.$cancel = this.$q.defer();

      this.getCotizaciones();

      this.success = this.$stateParams.success;
    }

    getCotizaciones(search = null) {
      return this.CotizacionFactory.getCotizaciones(search, this.$cancel)
        .then(cotizaciones => {
          cotizaciones.map(cotizacion => cotizacion.fecha_de_vencimiento = new Date(cotizacion.fecha_de_vencimiento));
          this.cotizaciones = cotizaciones;
        });
    }

    searchCotizaciones() {
      if(this.$cancel) {
        this.$cancel.resolve(true);
      }

      this.$cancel = this.$q.defer();
      this.getCotizaciones(this.q);
    }
  }

  angular
    .module('app.cotizacion')
    .component('cotizacion', {
      bindings: {},
      template: require('./dashboard.html'),
      controller: CotizacionDashboardController,
      controllerAs: 'c'
    });
}
