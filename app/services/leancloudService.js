(function(){
	'use strict';

	angular
		.module('app')
		.factory('leancloudService', leancloudService);

	function leancloudService(){



		var service = {

			getItems:getItems,
			rankFilter:rankFilter,
			getItem:getItem


		};

		return service;

		//////////

		function getItems(classA,classB,callback){

			var Table = AV.Object.extend("Item");
			var query = new AV.Query(Table);
			if(classA < 0 && classB < 0){
				query.find().then(callback);
			}else{
				
				if(classA >= 0){
					query.equalTo('classA',classA);
				}

				if(classB >= 0){
					query.equalTo('classB',classB);
				}

				query.find().then(callback);

			} 

		};

		function rankFilter(type,callback) {
			var Table = AV.Object.extend("Item");
			var query = new AV.Query(Table);

			query.descending(type);
			query.find().then(callback);


		};


		function getItem(id,callback){
			var Table = AV.Object.extend("Item");
			var query = new AV.Query(Table);
			query.get(id).then(callback);			
		}



	}

	 
})();