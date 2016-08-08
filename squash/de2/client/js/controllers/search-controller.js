app.controller('searchController',['$scope','$rootScope',function($scope,$rootScope){
	
	$scope.search = function() {
		$rootScope.isSearching = true;
		$rootScope.isIndexing = false;
	}
	
}]);
