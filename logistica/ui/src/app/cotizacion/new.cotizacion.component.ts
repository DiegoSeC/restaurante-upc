namespace Taller.Cotizacion {
  'use strict';

  class NewCotizacionController implements angular.IComponentController {
    static $inject = ['$filter', 'CotizacionFactory', '$uibModal', '$state', '$timeout', '$stateParams', '$scope'];

    private cotizacion = <Taller.Cotizacion.ICotizacion> {};
    private solicitud: Taller.Cotizacion.ISolicitudCotizacion;

    private subtotal: number = 0;
    private edit = false;

    private actionText = 'Registrar';
    private minDate;

    // private cotizacion;

    constructor(public $filter: angular.IFilterService,
                public CotizacionFactory: Taller.Cotizacion.ICotizacionFactory,
                public $uibModal: angular.ui.bootstrap.IModalService,
                public $state: angular.ui.IStateService,
                public $timeout: angular.ITimeoutService,
                public $stateParams: angular.ui.IStateParamsService,
                public $scope: angular.IScope) {

      console.log('New Cotizacion');

      this.minDate = new Date();
      this.solicitud = this.CotizacionFactory.getSolicitud();
      this.setCotizacion();

      // this.setSolicitudDetails();

      this.edit = !!this.$stateParams.id;

      if(this.edit) {
        this.getCotizacion();
        this.actionText = 'Actualizar';
      }
    }

    getCotizacion() {
      this.CotizacionFactory.getCotizacion(this.$stateParams.id)
        .then(cotizacion => {
          cotizacion.fecha_de_vencimiento = new Date(cotizacion.fecha_de_vencimiento);

          this.cotizacion = <ICotizacion> {
            numero: cotizacion.numero,
            numero_solicitud_de_cotizacion: cotizacion.numero_solicitud_de_cotizacion,
            idproveedor: cotizacion.idproveedor,
            ruc: cotizacion.proveedor.ruc,
            detalle: cotizacion.detalle,
            fecha_de_vencimiento: cotizacion.fecha_de_vencimiento,
            estado: cotizacion.estado,
            observacion: cotizacion.observacion
          };

          this.cotizacion.detalle.map(producto => producto.precioUnitario = Number(producto.precio));

          this.getDetails();
        });
    }

    getDetails() {
      this.subtotal = 0;

      this.cotizacion.detalle.forEach(producto => {
        producto.precioUnitario = producto.precioUnitario || 0.00;
        producto.cantidad = producto.cantidad || 0.00;
        this.subtotal += Number(producto.precioUnitario) * Number(producto.cantidad);
      });
    }

    saveCotizacion() {
      if(!this.edit) {
        return this.createCotizacion();
      }

      if(window.confirm('¿Está seguro de actualizar la cotización?')) {
        return this.CotizacionFactory.updateCotizacion(this.cotizacion)
          .then(() => {
            this.$state.go('app.cotizacion.dashboard', {success: 2});
          });
      }
    }

    createCotizacion() {
      if(window.confirm('¿Está seguro que desea registrar esta cotización?')) {
        return this.CotizacionFactory.createCotizacion(this.cotizacion)
          .then(() => {
            this.$state.go('app.cotizacion.dashboard', {success: 1});
          });
      }
    }

    $onDestroy() {
      this.CotizacionFactory.setSolicitud(null);
    }

    updateValues() {
      this.$timeout(() => this.getDetails());
    }

    setCotizacion() {
      if (!this.solicitud) {
        return null;
      }

      this.cotizacion = <ICotizacion> {
        numero_solicitud_de_cotizacion: this.solicitud.numero,
        idproveedor: this.solicitud.proveedor.id,
        ruc: this.solicitud.proveedor.ruc,
        detalle: this.solicitud.productos
      };

      this.getDetails();
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
