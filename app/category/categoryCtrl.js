(function(){
	'use strict';

	angular
		.module('app')
		.controller('CategoryCtrl', CategoryCtrl);

	CategoryCtrl.$inject = ['$scope','$route','leancloudService'];

	function CategoryCtrl($scope,$route,leancloudService){


		var params = $route.current.params;
		// console.log(params);

		var refresh = function(){
			window.location.reload();
		};


		$scope.items = [];
		$scope.data = {};

		$scope.routes = [];

		$scope.filter = function(classA,classB){

			$scope.classA = classA;
			$scope.classB = classB;

			var key = String(classA) + '_' + String(classB);
			$scope.routes = RoutesDict[key]
			if ($scope.data[key]){
				$scope.items = $scope.data[key];
				return;
			}


			leancloudService.getItems(classA,classB,function(results){
				$scope.$apply(function(){
					$scope.items =  results.map(function(each){
						var dic = each._serverData;
						dic.id = each.id;
						return dic;
					});//JSON.parse(JSON.stringify(results));
					console.log($scope.items);
					$scope.data[key] = $scope.items;
				});
			});

		};



		$scope.filter_breadcrumb = function(classA,classB,index){

			if(index == 3){
				return;
			}

			if(index == 0){
				window.location.reload();
			}

			$scope.routes.splice(3,1);
			$scope.filter(classA,classB);

		};


		$scope.filter(parseInt(params.a),parseInt(params.b));
		
	}
	

})();