namespace Taller.Cotizacion {
  'use strict';

  class SolicitudCotizacionController implements angular.IComponentController {
    static $inject = ['CotizacionFactory', '$state', '$rootScope'];

    private solicitudes: Array<Taller.Cotizacion.ISolicitudCotizacion>;
    private solicitudSelected: number;

    constructor(public CotizacionFactory: Taller.Cotizacion.ICotizacionFactory,
                public $state: angular.ui.IStateService,
                public $rootScope: angular.IRootScopeService) {
      this.getSolicitudCotizacion();
    }

    getSolicitudCotizacion() {
      return this.CotizacionFactory.getSolicitudCotizacion()
        .then(solicitudes => {
          solicitudes.map(solicitud => {
            solicitud.created = new Date(solicitud.created);
          });

          this.solicitudes = solicitudes;
        });
    }

    setSolicitud() {
      let solicitud = this.solicitudes[this.solicitudSelected];
      this.CotizacionFactory.setSolicitud(solicitud);
      this.$state.go('app.cotizacion.form');
    }
  }

  angular
    .module('app.cotizacion')
    .component('solicitudCotizacion', {
      bindings: {},
      controller: SolicitudCotizacionController,
      controllerAs: 's',
      template: require('./solicitud.cotizacion.html')
    });
}
