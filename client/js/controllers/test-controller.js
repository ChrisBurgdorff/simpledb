app.controller('testController',['$scope','$rootScope','$http','$sce', function($scope,$rootScope, $http, $sce){
	if(localStorage['Basey-User-Data']) {
			
			window.location = './main'; 	
		} 	
	
}]);
