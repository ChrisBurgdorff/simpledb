app.controller('indexController',['$scope','$rootScope',function($scope,$rootScope) {
	
	$scope.index = function() {
		$rootScope.isIndexing = true;
		$rootScope.isSearching = false;
	}
	
	$scope.addTemplate = function() {
		$scope.templating = true;
	}
	
	$scope.submitTemplate = function() {
		var temp = { name: $scope.newTemplate, fields: [] };
		$scope.templates.push(temp);
	}
	
	$scope.addField = function() {
		var newField = { name: $scope.newFieldName, type: $scope.newFieldType };
		var tempId = -1;
		for(var i=0;i< $scope.templates.length;i++) {
			if($scope.templates[i].name == $scope.currTemplate ) {
					tempId = i;
			}
		}
		if ( tempId >= 0 ) {
			$scope.templates[tempId].fields.push(newField);
		}
	}
	
	$scope.templates = [{ name: 'Template 1', fields: [] },
						{ name: 'Template 2', fields: [] },
						{ name: 'Template 3' , fields: [] }];
	
}]);
