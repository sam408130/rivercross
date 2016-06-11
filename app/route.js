
(function() {
  'use strict';

  angular
    .module('app')
    .config(configFunction);



  function configFunction($routeProvider) {
    $routeProvider

    .when('/', {
      templateUrl: 'app/landing.html',
      controller: 'LandingCtrl'
    })

    .when('/category/:a/:b',{
    	templateUrl:'app/category.html',
    	controller:'CategoryCtrl'
    })

    .when('/detail/:id',{
    	templateUrl:'app/detail.html',
    	controller:'DetailCtrl'
    })

    .otherwise({
      redirectTo: '/'
    });
  }



})();


