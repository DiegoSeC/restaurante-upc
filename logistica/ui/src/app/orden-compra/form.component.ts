namespace Taller.OrdenCompra {
  'use strict';

  class FormController implements angular.IComponentController {
    static $inject = ['$stateParams', 'OrdenCompraFactory', '$q', '$scope', '$timeout', '$state'];

    private edit: boolean;
    private orden: Taller.OrdenCompra.IOrdeCompra;

    private cotizaciones;

    private cotizacion;
    private cotizacionURL;

    private sede;
    private actionText = 'Registrar';
    private minDate;
    private subtotal;
    private defaultOrden;

    constructor(public $stateParams: angular.ui.IStateParamsService,
                public OrdenCompraFactory: Taller.OrdenCompra.IOrdenCompraFactory,
                public $q: angular.IQService,
                public $scope: angular.IScope,
                public $timeout: angular.ITimeoutService,
                public $state: angular.ui.IStateService) {

      this.edit = !!this.$stateParams.id;
      this.cotizacionURL = `${this.OrdenCompraFactory.getBaseUrl()}/ordenes/cotizaciones?q=`;
      this.sede = 'LIMA';
      this.minDate = new Date();

      this.$scope.$watch('f.cotizacion.originalObject', this.setSubtotal.bind(this));

      if(this.edit) {
        this.actionText = 'Actualizar';
        this.getOrden();
      }
    }

    getOrden() {
      return this.OrdenCompraFactory.getOrden(this.$stateParams.id).then(res => {
        res.fecha = new Date(res.fecha);
        this.defaultOrden = angular.copy(res);
        this.orden = res;
      });
    }

    setSubtotal(val) {
      if(!angular.isDefined(val)) {
        return null;
      }

      this.subtotal = 0;

      this.cotizacion.originalObject.detalle.map(producto => {
        producto.precio = producto.precio || 0.00;
        producto.cantidad = producto.cantidad || 0.00;
        this.subtotal += producto.precio * producto.cantidad;
      });
    }

    updateValues() {
      this.$timeout(() => this.setSubtotal(1));
    }

    saveOrden() {
      if(!this.edit) {
        return this.createOrden();
      }

      if(window.confirm('¿Está seguro de actualizar la orden de compra?')) {
        return this.OrdenCompraFactory.updateOrden(this.orden)
          .then(res => this.$state.go('app.ordenCompra.dashboard', {success: 2, id: res.numero}));
      }
    }

    createOrden() {
      let ordenCompra = {
        fecha: this.orden.fecha,
        observacion: this.orden.observacion,
        idproveedor: this.cotizacion.originalObject.proveedor.id,
        numero_cotizacion: this.cotizacion.originalObject.numero,
        detalle: this.cotizacion.originalObject.detalle,
        sede: this.sede
      };

      if(window.confirm('¿Está seguro que desea registrar esta orden de compra?')) {
        return this.OrdenCompraFactory.createOrden(ordenCompra)
          .then(res => this.$state.go('app.ordenCompra.dashboard', {success: 1, id: res.numero}));
      }
    }
  }

  angular
    .module('app.ordenCompra')
    .component('ordenForm', {
      bindings: {},
      controller: FormController,
      controllerAs: 'f',
      template: require('./form.html')
    });
}
