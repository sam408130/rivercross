(function() {
  'use strict';

  angular
    .module('app')
    .directive('rcCards', rcCards);

  function rcCards() {
    return {
      templateUrl: 'app/directives/rcCards.html',
      restrict: 'E',
      scope: {
        items: '='
      }
    };
  }

})();