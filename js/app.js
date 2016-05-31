
var myapp = angular.module("myModule",['ngFileUpload']);

AV.initialize('OXdjANr9rRdjLX2cVhkFfLmy-gzGzoHsz','0PfhYi7NnuusUAWGhNo06HcI');

myapp.controller('Home',function($scope){

	var ApplyObject = AV.Object.extend('Item');
	var query = new AV.Query(ApplyObject);
	$scope.items = [];
	$scope.filter = function(classA,classB){
		console.log(classA);
		console.log(classB);
		if(classA >= 0){
			query.equalTo('classA',classA);
		}
		
		if(classB >= 0){
			query.equalTo('classB',classB);
		}
		
		query.find({
			success:function(results){
				$scope.items = results.map(function(result){
					return result._serverData;
				});
				$scope.$apply();
				console.log($scope.items);
			},error:function(_,error){
				alert(error.message);
			}
		})
	};

	$scope.filter(-1,-1);

	$scope.refresh = function(){
		window.location.reload();
	};
});


myapp.controller('Post',function($scope){

	$scope.images = [];
	$scope.localimages = [];
    $scope.uploadFile = function(file,errFiles){

    	var url = URL.createObjectURL(file);
    	$scope.localimages.push(url);
        var avFile = new AV.File('cover.png',file);
        avFile.save().then(function(fileobj){
        	
        	$scope.images.push(fileobj._url);
      
        })

	};


	$scope.item = {
		title:'',
		price:0
	};

	$scope.CatagoryA = [{name:'Ionic产品',index:0},{name:'App-UI产品',index:1},{name:'Ionic定制化开发',index:2},{name:'IOS定制化开发',index:3},{name:'接单-毕业设计',index:4},{name:'教程',index:5}];


	$scope.CatagoryAChange = function(){

		if ($scope.item.classA == 0){

			$scope.CatagoryB = [
				{name:'电商类模板',index:0},
				{name:'社交类模板',index:1}
			];
		}else if($scope.item.classA == 1){
			$scope.CatagoryB = [
				{name:'电商',index:0},
				{name:'社交',index:1}
			];			
		}else if($scope.item.classA == 5){
			$scope.CatagoryB = [
				{name:'设计教程',index:0},
				{name:'前端教程',index:1},
				{name:'AngularJs教程',index:2},
				{name:'CG教程',index:3}
			];			
		}else{
			$scope.CatagoryB = [];
		}
		console.log(typeof($scope.item.classA));
		console.log($scope.CatagoryB);
	};

	$scope.submit = function(){
		console.log($scope.item);
		var ApplyObject = AV.Object.extend('Item');
		var uploadItem = new ApplyObject();
		uploadItem.set('images',$scope.images);
		uploadItem.set('price',parseFloat($scope.item.price));
		uploadItem.set('title',$scope.item.title);
		uploadItem.set('classA',parseInt($scope.item.classA));
		uploadItem.set('classB',parseInt($scope.item.classB));
		uploadItem.save({
			success:function(){
				alert('submit success!');
				window.location.reload();

			},error:function(_,error){
				alert(error.message);
			}
		});
	}
})

