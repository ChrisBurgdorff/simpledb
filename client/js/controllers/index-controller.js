app.controller('indexController',['$scope','$rootScope', '$http' ,function($scope,$rootScope,$http) {
	
	//$http.get('/api/template/', {name: $rootScope.companyName }).success(function(response){
	//	console.log(response);
	//});
	
	//$rootScope.isIndexing = true;
	$rootScope.neither = true;
	
	$scope.index = function() {
		$rootScope.isIndexing = true;
		$rootScope.isSearching = false;	
		$rootScope.neither = false;
	}
	
	$scope.search = function() {
		$rootScope.isSearching = true;
		$rootScope.isIndexing = false;
		$rootScope.neither = false;
	}
	
	if(localStorage['Basey-User-Data']) {
		console.log("Local Storage Found");
		var compId = JSON.parse(localStorage.getItem('Basey-User-Data')).company_id;
		var userId = JSON.parse(localStorage.getItem('Basey-User-Data'))._id;
		$http.get('/api/company/' + compId).success(function(res){
			console.log("get templates successfull");
			console.log(JSON.stringify(res.templates));
			$rootScope.templates = res.templates;
		});
	} else {
		console.log("User not found");
	}
	
	$scope.fields = []; 
	
	$scope.addTemplate = function(option) {
		$scope.indexing = true;
		if(option == "New Template" ) {
			$scope.templating = true;
			$scope.fields = [];
			$scope.indexing = false;
		} else {
			$scope.templating = false;
			if(option != "---Select Template---") {
				$scope.indexing = true;
				var tempIndex = -1;
				for(var i=0;i<$rootScope.templates.length;i++) {
					console.log($rootScope.templates[i].name);
					console.log(option);
					if ($rootScope.templates[i].name == option) {
						tempIndex = i;
					}
				}
				if (tempIndex >= 0) {
					$scope.fields = $rootScope.templates[tempIndex].fields;
				} else {
					console.log("Index not found");
				}
				//GET Fields from DB
			}
		}
	}
	
	$scope.submitTemplate = function() {
		var temp = { name: $scope.newTemplate, fields: $scope.fields };
		$rootScope.templates.push(temp);
		$scope.templating = false;
		$scope.indexing = true;
		$http.put('/api/company/', {
									_id: compId,
									templates: $rootScope.templates
									}).success(function(r){console.log("S");})
									.error(function(e){console.log(e);});
		//Save to DB
	}
	
	$scope.cancelTemplate = function() {
		$scope.templating = false;
	}
	
	$scope.addField = function() {
		var newField = { name: $scope.newFieldName, type: $scope.newFieldType };
		var tempId = -1;
		$scope.fields.push(newField);
		$scope.newFieldName = "";
		$scope.newFieldType = "";
	}
	
	$scope.submitRecord = function() {
		var fieldsArray = document.getElementsByClassName("fields");
		var valueArray = [];
		for (var j=0;j<fieldsArray.length;j++) {
			valueArray.push(fieldsArray[j].value);
		}
		$http.post('/api/record/',{
									company_id: compId,
									user_id: userId,
									template: $scope.currTemplate,
									fields: valueArray
									}).success(function(r){
										for (var k=0;k<fieldsArray.length;k++) {
												fieldsArray[k].value = "";
										}
									}).error(function(e){console.log(e);});
	}
	
	/*$rootScope.templates = [{ name: 'Template 1', fields: [] },
						{ name: 'Template 2', fields: [] },
						{ name: 'Template 3' , fields: [] }];  */
	
}]);
