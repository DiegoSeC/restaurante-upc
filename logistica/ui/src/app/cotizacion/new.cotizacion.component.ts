namespace Taller.Cotizacion {
  'use strict';

  class NewCotizacionController implements angular.IComponentController {
    static $inject = ['$filter', 'CotizacionFactory', '$uibModal', '$state', '$timeout'];

    private cotizacion = <Taller.Cotizacion.ICotizacion> {};
    private solicitud: Taller.Cotizacion.ISolicitudCotizacion;

    private subtotal: number = 0;

    constructor(public $filter: angular.IFilterService,
                public CotizacionFactory: Taller.Cotizacion.ICotizacionFactory,
                public $uibModal: angular.ui.bootstrap.IModalService,
                public $state: angular.ui.IStateService,
                public $timeout: angular.ITimeoutService) {

      console.log('New Cotizacion');

      this.solicitud = this.CotizacionFactory.getSolicitud();
      this.setSolicitudDetails();
    }

    setSolicitudDetails() {
      if (!this.solicitud) {
        return null;
      }

      this.cotizacion.ruc = this.solicitud.ruc;

      this.solicitud.productos.forEach(producto => {
        this.subtotal += producto.precioUnitario * producto.cantidad;
      });
    }

    saveCotizacion() {
      this.$state.go('app.cotizacion.dashboard', {success: 1});
    }

    $onDestroy() {
      this.CotizacionFactory.setSolicitud(null);
    }
  }

  angular
    .module('app.cotizacion')
    .component('newCotizacion', {
      bindings: {},
      controller: NewCotizacionController,
      controllerAs: 'n',
      template: require('./form.html')
    });
}
