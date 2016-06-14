(function(){
	'use strict';

	angular
		.module('app')
		.controller('LandingCtrl', LandingCtrl);

	LandingCtrl.$inject = ['$scope','leancloudService'];

	function LandingCtrl($scope,leancloudService){


		//刷新页面

		var refresh = function(){
			window.location.reload();
		};


		$scope.items = [];
		$scope.data = {};

		$scope.filterIndex = 0;

		$scope.rank_filter = function(type,index){

			$scope.filterIndex = index;
			if($scope.data[type]){
				$scope.items = $scope.data[type];
				console.log($scope.data);
				return;
			}

			leancloudService.rankFilter(type,function(results){
				$scope.$apply(function(){
					$scope.items = results.map(function(each){
						var dict = each._serverData;
						dict.id = each.id;
						return dict;
					});
					$scope.data[type] = $scope.items;
				});
			});

		};

		$scope.rank_filter('score',0);

		
	}
	

})();