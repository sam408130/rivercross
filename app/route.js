
(function() {
  'use strict';

  angular
    .module('app')
    .config(configFunction);



  function configFunction($routeProvider) {
    $routeProvider

    .when('/', {
      templateUrl: 'app/landing/landing.html',
      controller: 'LandingCtrl'
    })

    .when('/category/:a',{
    	templateUrl:'app/category/category.html',
    	controller:'CategoryCtrl'
    })

    .when('/detail/:id',{
    	templateUrl:'app/detail/detail.html',
    	controller:'DetailCtrl'
    })
    
    .when('/contact',{
        templateUrl:'app/contact/contact.html',
        controller:'ContactCtrl'
    })
    
    .when('/about',{
        templateUrl:'app/about/about.html',
        controller:'AboutCtrl'
    })
    
    
    .when('/blogs',{
        templateUrl:'app/blogs/blogs.html',
        controller:'BlogCtrl'
    })

    .otherwise({
      redirectTo: '/'
    });
  }



})();


