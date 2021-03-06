namespace Taller {
  'use strict';

  angular
    .module('app')
    .filter('codigo', () => {
      return function(input, cot) {
        function paddy(n, p, c) {
          var pad_char = typeof c !== 'undefined' ? c : '0';
          var pad = new Array(1 + p).join(pad_char);
          return (pad + n).slice(-pad.length);
        }

        if(!angular.isDefined(input)) {
          return '---';
        }

        if(cot) {
          return `COT17${paddy(input, 4, 0)}`;
        }

        return `N17${paddy(input, 4, 0)}`;
      }
    });
}
