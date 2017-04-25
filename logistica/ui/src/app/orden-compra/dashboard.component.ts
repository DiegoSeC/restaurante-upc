namespace Taller.OrdenCompra {
  'use strict';

  class DashboardController implements angular.IComponentController {

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
