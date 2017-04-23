namespace Taller.Cotizacion {
  'use strict';

  angular
    .module('app.cotizacion')
    .config(init);

  init.$inject = ['$stateProvider'];

  function init($stateProvider: angular.ui.IStateProvider) {
    $stateProvider
      .state('app.cotizacion', {
        url: 'cotizacion',
        abstract: true,
        template: '<ui-view></ui-view>'
      })
      .state({
        name: 'app.cotizacion.dashboard',
        url: '',
        component: 'cotizacion'
      });
  }
}
