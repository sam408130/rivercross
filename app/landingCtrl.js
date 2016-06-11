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

		$scope.pageIndex = 0;

		$scope.filterIndex = 0;


		var dict = {
			'0_-1':[{name:'首页',index:[-1,-1]},{name:'Ionic产品',index:[0,-1]},{name:'',index:[]}],
			'0_0':[{name:'首页',index:[-1,-1]},{name:'Ionic产品',index:[0,-1]},{name:'电商类',index:[0,0]}],
			'0_1':[{name:'首页',index:[-1,-1]},{name:'Ionic产品',index:[0,-1]},{name:'社交类',index:[0,1]}],
			'1_-1':[{name:'首页',index:[-1,-1]},{name:'UI设计',index:[1,-1]},{name:'',index:[]}],
			'1_0':[{name:'首页',index:[-1,-1]},{name:'UI设计',index:[1,-1]},{name:'App UI',index:[1,0]}],
			'1_1':[{name:'首页',index:[-1,-1]},{name:'UI设计',index:[1,-1]},{name:'Web UI',index:[1,1]}],
			'1_2':[{name:'首页',index:[-1,-1]},{name:'UI设计',index:[1,-1]},{name:'Icons',index:[1,2]}],
			'2_-1':[{name:'首页',index:[-1,-1]},{name:'前端网页',index:[2,-1]},{name:'',index:[]}],
			'3_-1':[{name:'首页',index:[-1,-1]},{name:'学习教程',index:[3,-1]},{name:'',index:[]}],
			'4_-1':[{name:'首页',index:[-1,-1]},{name:'个性化接单',index:[4,-1]},{name:'',index:[]}]
		};

		$scope.routes = new Array();

		$scope.routes = $scope.routes.concat([{name:'首页',index:[-1,-1]},{name:'',index:[]},{name:'',index:[]}]);


		$scope.rank_filter = function(type,index){


			console.log(type);
			$scope.pageIndex = 0;
			$scope.filterIndex = index;
			leancloudService.rankFilter(type,function(results){
				$scope.$apply(function(){
					$scope.items = JSON.parse(JSON.stringify(results));
				});
			});

		};

		$scope.rank_filter('score',0);



		$scope.filter = function(classA,classB){

			$scope.pageIndex = 1;
			$scope.classA = classA;
			$scope.classB = classB;

			var key = String(classA) + '_' + String(classB);
			console.log(key);
			$scope.routes = dict[key]
			if ($scope.data[key]){
				$scope.items = $scope.data[key];
				return;
			}


			leancloudService.getItems(classA,classB,function(results){
				$scope.$apply(function(){
					$scope.items = JSON.parse(JSON.stringify(results));
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

		$scope.show_detail = function(item){
			$scope.filter(item.classA,item.classB);
			$scope.pageIndex = 2;
			$scope.currentItem= item;
			console.log(item);
			$scope.routes.push({name:item.title});
		};



		
	}
	

})();