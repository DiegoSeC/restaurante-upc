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
        url: '?success',
        component: 'cotizacion'
      })
      .state({
        name: 'app.cotizacion.form',
        url: '/new',
        component: 'newCotizacion'
      })
      .state({
        name: 'app.cotizacion.edit',
        url: '/edit/:id',
        component: 'newCotizacion'
      })
      .state({
        name: 'app.cotizacion.solicitud',
        url: '/solicitud-cotizacion',
        component: 'solicitudCotizacion'
      });
  }
}
