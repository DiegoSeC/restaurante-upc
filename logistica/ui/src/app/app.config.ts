namespace Taller {
  'use strict';

  angular
    .module('app')
    .config(init);

  init.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];

  function init($stateProvider: angular.ui.IStateProvider,
                $locationProvider: angular.ILocationProvider,
                $urlRouterProvider: angular.ui.IUrlRouterProvider) {

    $locationProvider.html5Mode(false);
    $urlRouterProvider.otherwise('/cotizacion');

    $stateProvider
      .state('app', {
        url: '/',
        abstract: true,
        template: require('./app.html')
      });
  }
}
