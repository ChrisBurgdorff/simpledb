app.controller('loginController',['$scope','$resource', '$http',function($scope, $resource, $http){
	
	var User = $resource('/api/user');
	
	if(localStorage['Basey-User-Data']) {
			console.log("Local Storage Found");
			$scope.loggedIn = true;
			var userEmail = JSON.parse(localStorage.getItem('Basey-User-Data')).email;
			var companyName = JSON.parse(localStorage.getItem('Basey-User-Data')).company;
			$scope.companyName = companyName;
			$scope.userEmail = userEmail;
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
			} else if (response.email == "Ema") {
				$scope.emailFound = true;
			} else if (response.email == "Com") {
				$scope.compFound = true;
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
	
	/*$scope.register = function() {
		$http.post('/api/user/',$scope.user).success(function(response) {
			console.log("Response.email is " + response.email);
			if (response.email == "Ema") {
				$scope.emailFound = true;
				$scope.compFound = false;
			} else if (response.email == "Com") {
				$scope.compFound = true;
				$scope.emailFound = false;
			} else {
				var user = new User();
				user.email = $scope.user.email;
				user.password = $scope.user.password;
				if ( $scope.user.company == "" || $scope.user.company == null ) {
					console.log("IN if0");
					user.company = user.email;
					console.log("User.company is " + user.company);
					console.log("User.email is " + user.email);
				} else {
					console.log("In else" + " " + $scope.user.company);
					user.company = $scope.user.company;
				}
				user.$save(function(result) {
					//alert("User Saved Successfully");
					$scope.regSuccess = true;
					var users = [];
					users.push(response.email);
					$http.post('/api/company/',{name: response.company,
												users: users,
												templates: []}).success(function(re){
													console.log("Company saved");
													console.log("Comp id is " + re._id);
												}).error(function(err) {
													console.log("ERROR");
													console.log(err);
												});
					localStorage.setItem('Basey-User-Data',JSON.stringify(response));
					setTimeout(function(){window.location='./main/';},1500);
					console.log("user.company is " + response.company);
				});
			}
		});
	} */
		$scope.register = function() {
		$http.post('/api/user/',$scope.user).success(function(response) {
			console.log("Response.email is " + response.email);
			if (response.email == "Ema") {
				$scope.emailFound = true;
				$scope.compFound = false;
			} else if (response.email == "Com") {
				$scope.compFound = true;
				$scope.emailFound = false;
			} else {
				var user = new User();
				user.email = $scope.user.email;
				user.password = $scope.user.password;
				//user.company_id = "";
				if ( $scope.user.company == "" || $scope.user.company == null ) {
					console.log("IN if0");
					user.company = user.email;
					console.log("User.company is " + user.company);
					console.log("User.email is " + user.email);
				} else {
					console.log("In else" + " " + $scope.user.company);
					user.company = $scope.user.company;
				}
				user.$save(function(result) {
					//alert("User Saved Successfully");
					$scope.regSuccess = true;
					var users = [];
					users.push(response.email);
					$http.post('/api/company/',{name: response.company,
												users: users,
												templates: []}).success(function(re){
													console.log("Company saved");
													console.log("Comp id is " + re._id);
													$http.put('/api/user/' + response._id,{
														email: response.email,
														password: response.password,
														company: response.company,
														company_id: re._id
													}).success(function(r){
														console.log("User put successful.");
														localStorage.setItem('Basey-User-Data',JSON.stringify(r));
													}).error(function(e) {
														console.log("Error in user put " + e);
													});
												}).error(function(err) {
													console.log("ERROR");
													console.log(err);
												});
					setTimeout(function(){window.location='./main/';},1500);
					console.log("user.company is " + response.company);
				});
			}
		});
	}
	/*
	$scope.register = function() {
		var user = new User();
		user.email = $scope.user.email;
		user.password = $scope.user.password;
		if ( $scope.user.company == "" || $scope.user.company == null ) {
			user.company = user.email;
		} else {
			user.company = $scope.user.company;
		}
		user.$save(function(result) {
			alert("User Saved Successfully");
			console.log("user.company is " + user.company);
		});
	} */
	
	$scope.signOut = function() {
		$scope.loggedIn = false;
		localStorage.setItem('Basey-User-Data','');
		window.location = './';
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
