(function(){
	'use strict';

	angular
		.module('app')
		.controller('DetailCtrl', DetailCtrl);

	DetailCtrl.$inject = ['$scope','$route','leancloudService'];

	function DetailCtrl($scope,$route,leancloudService){


		//刷新页面
		var id = $route.current.params.id;
		leancloudService.getItem(id,function(result){
			$scope.$apply(function(){
				$scope.currentItem = result._serverData;
			});
		});




		
	}
	

})();