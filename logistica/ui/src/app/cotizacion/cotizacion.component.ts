namespace Taller.Cotizacion {
  'use strict';

  class CotizacionDashboardController implements ng.IComponentController {
    static $inject = ['CotizacionFactory', '$stateParams'];

    public currentDate: Date;
    public cotizaciones: Array<Taller.Cotizacion.ICotizacion>;

    public success: boolean;

    constructor(public CotizacionFactory: ICotizacionFactory,
                public $stateParams: angular.ui.IStateParamsService) {
      console.log('Starting Cotizacion Dashboard', $stateParams);
      this.currentDate = new Date();

      this.getCotizaciones();

      this.success = !!this.$stateParams.success;
    }

    getCotizaciones() {
      return this.CotizacionFactory.getCotizaciones()
        .then(cotizaciones => {
          cotizaciones.map(cotizacion => {
            cotizacion.created = new Date(cotizacion.created);
            cotizacion.updated = new Date(cotizacion.updated);
          });

          this.cotizaciones = cotizaciones;
        });
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
