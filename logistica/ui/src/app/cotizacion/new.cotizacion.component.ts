namespace Taller.Cotizacion {
  'use strict';

  class NewCotizacionController implements angular.IComponentController {
    static $inject = ['$filter', 'CotizacionFactory', '$uibModal', '$state', '$timeout', '$stateParams'];

    private cotizacion = <Taller.Cotizacion.ICotizacion> {};
    private solicitud: Taller.Cotizacion.ISolicitudCotizacion;

    private subtotal: number = 0;
    private edit = false;

    private actionText = 'Registrar';

    constructor(public $filter: angular.IFilterService,
                public CotizacionFactory: Taller.Cotizacion.ICotizacionFactory,
                public $uibModal: angular.ui.bootstrap.IModalService,
                public $state: angular.ui.IStateService,
                public $timeout: angular.ITimeoutService,
                public $stateParams: angular.ui.IStateParamsService) {

      console.log('New Cotizacion');

      this.solicitud = this.CotizacionFactory.getSolicitud();
      this.setSolicitudDetails();

      this.edit = !!this.$stateParams.id;

      if(this.edit) {
        this.getCotizacion();
        this.actionText = 'Actualizar';
      }
    }

    getCotizacion() {
      this.CotizacionFactory.getCotizacion(this.$stateParams.id)
        .then(cotizacion => {
          cotizacion.created = new Date(cotizacion.created);
          this.cotizacion = cotizacion;

          this.getDetails();
        });
    }

    setSolicitudDetails() {
      if (!this.solicitud) {
        return null;
      }

      this.cotizacion.ruc = this.solicitud.ruc;
      this.cotizacion.productos = this.solicitud.productos;

      this.getDetails();
    }

    getDetails() {
      this.cotizacion.productos.forEach(producto => {
        this.subtotal += producto.precioUnitario * producto.cantidad;
      });
    }

    saveCotizacion() {
      if(!this.edit) {
        return this.createCotizacion();
      }

      if(window.confirm('¿Está seguro de actualizar la cotización?')) {
        this.$state.go('app.cotizacion.dashboard', {success: 2});
      }
    }

    createCotizacion() {
      if(window.confirm('¿Está seguro que desea registrar esta cotización?')) {
        this.$state.go('app.cotizacion.dashboard', {success: 1});
      }
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
