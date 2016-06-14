(function() {
  'use strict';

  angular
    .module('app')
    .directive('rcSidebar', rcSidebar);

  function rcSidebar() {
    return {
      templateUrl: 'app/directives/rcSidebar.html',
      restrict: 'E'
      
    };
  }

})();