namespace Taller.Cotizacion {
  'use strict';

  class CotizacionDashboardController implements ng.IComponentController {
    static $inject = ['CotizacionFactory'];

    public currentDate: Date;
    public cotizaciones: Array<Taller.Cotizacion.ICotizacion>;

    constructor(public CotizacionFactory: ICotizacionFactory) {
      console.log('Starting Cotizacion Dashboard');
      this.currentDate = new Date();

      this.getCotizaciones2();
    }

    getCotizaciones2() {
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
