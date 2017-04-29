namespace Taller.Cotizacion {
  'use strict';

  class SolicitudCotizacionController implements angular.IComponentController {
    static $inject = ['CotizacionFactory', '$state', '$rootScope', '$q'];

    private solicitudes: Array<Taller.Cotizacion.ISolicitudCotizacion>;
    private solicitudSelected: number;

    public $cancel: angular.IDeferred<boolean>;
    public q;

    constructor(public CotizacionFactory: Taller.Cotizacion.ICotizacionFactory,
                public $state: angular.ui.IStateService,
                public $rootScope: angular.IRootScopeService,
                public $q: angular.IQService) {
      this.$cancel = this.$q.defer();
      this.getSolicitudCotizacion();
    }

    getSolicitudCotizacion(search = null) {
      return this.CotizacionFactory.getSolicitudCotizacion(search, this.$cancel)
        .then(solicitudes => {
          solicitudes.map(solicitud => {
            solicitud.fecha = new Date(solicitud.fecha);
          });

          this.solicitudes = solicitudes;
        });
    }

    setSolicitud() {
      let solicitud = this.solicitudes[this.solicitudSelected];
      this.CotizacionFactory.setSolicitud(solicitud);
      this.$state.go('app.cotizacion.form');
    }

    searchSolicitudes() {
      if(this.$cancel) {
        this.$cancel.resolve(true);
      }

      this.$cancel = this.$q.defer();
      this.getSolicitudCotizacion(this.q);
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
