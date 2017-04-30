namespace Taller.OrdenCompra {
  'use strict';

  angular
    .module('app.ordenCompra')
    .config(init);

  init.$inject = ['$stateProvider'];

  function init($stateProvider: angular.ui.IStateProvider) {
    $stateProvider
      .state('app.ordenCompra', {
        url: 'orden-compra',
        abstract: true,
        template: '<ui-view></ui-view>'
      })
      .state({
        name: 'app.ordenCompra.dashboard',
        url: '?success&id',
        component: 'dashboard'
      })
      .state({
        name: 'app.ordenCompra.form',
        url: '/new',
        component: 'ordenForm'
      })
      .state({
        name: 'app.ordenCompra.edit',
        url: '/edit/:id',
        component: 'ordenForm'
      });
  }
}
