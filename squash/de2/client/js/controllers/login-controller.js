app.controller('loginController',['$scope','$resource', '$http',function($scope, $resource, $http){
	
	var User = $resource('/api/user');
	
	if(localStorage['Basey-User-Data']) {
			$scope.loggedIn = true;
			var userEmail = JSON.parse(localStorage.getItem('Basey-User-Data')).email;
			//NOT WORKING: $scope.user.email = userEmail;
			//if(window.location != './main') {window.location = './main'; }		
		} else {
			$scope.loggedIn = false;
		}
	
	$scope.signIn = function() {
		$http.post('/api/user/signin/', $scope.user).success(function(response) {
			//localStorage.setItem('User-Data',JSON.strinify(response));
			//$scope.loggedIn = true;
			console.log("User signed in");
			console.log("Signed in " + $scope.user.email + " with password " + $scope.user.password);
			console.log(response.email);
			if(response.email == "Err") {
				$scope.signInError = true;
				$scope.loggedIn = false;
			} else {
				$scope.signInError = false;
				$scope.loggedIn = true;
				localStorage.setItem('Basey-User-Data',JSON.stringify(response));
				console.log(JSON.stringify(response));
				window.location = './main';
			}
		}).error(function(err) {
			console.log(err);
		});
	}
	
	$scope.register = function() {
		var user = new User();
		user.email = $scope.user.email;
		user.password = $scope.user.password;
		user.$save(function(result) {
			alert("User Saved Successfully");
		});
	}
	
	$scope.signOut = function() {
		$scope.loggedIn = false;
		localStorage.setItem('Basey-User-Data','');
		//window.location = './';
	}
	
	
	/*
	$scope.logUserIn = function() {
				$http.post('api/user/login', $scope.login).success(function(response) {
						console.log("Got to n-c.js login");
						localStorage.setItem('User-Data',JSON.stringify(response));
						$scope.loggedIn = true;
					}).error(function(error) {
						console.error(error);
						});
			}
		
		}]); */
	
	
}]);
