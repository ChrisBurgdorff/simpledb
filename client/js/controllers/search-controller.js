app.controller('searchController',['$scope','$rootScope','$http','$sce', function($scope,$rootScope, $http, $sce){
	
	//$rootScope.isSearching = true;

	
	var selectedTemplate;

	
	$scope.changeTemplate = function(option) {
		if(option != "All") {
			$scope.searching = true;
			$scope.inputFields = ['DGAF'];
			var tempIndex = -1;
			for(var i=0;i<$rootScope.templates.length;i++) {
				console.log($rootScope.templates[i].name);
				console.log(option);
				if ($rootScope.templates[i].name == option) {
					tempIndex = i;
				}
			}
			if (tempIndex >= 0) {
				$scope.searchFields = $rootScope.templates[tempIndex].fields;
				selectedTemplate = $rootScope.templates[tempIndex].name;
			} else {
				console.log("Index not found");
			}
		} else {
			selectedTemplate = "All";
		}
	}
	
	function indexMatchingText(ele, text) {
    for (var i=0; i<ele.length;i++) {
        if (ele[i].childNodes[0].nodeValue === text){
            return i;
        }
    }
		return undefined;
	}
	
	function displayResults(results) {
		var newResults = [];
		var select =document.getElementById('fieldDDL').getElementsByTagName("option");
		var ind = indexMatchingText(select, $scope.fieldToSearch);
		var displayTable = "";
		var tableHtml, tableHead;
		var tableHead = "";
		var tableRows = [];
		var tableCells = [];
		var headers = [];
		for(var j=0; j<$scope.searchFields.length;j++) {
			headers.push($scope.searchFields[j].name);
			tableHead = tableHead + "<th>" + $scope.searchFields[j].name + "</th>";
			console.log(tableHead);
		}
		tableHead = tableHead + "</tr>";
		var regex = new RegExp($scope.valueToSearch, 'i');
		if(j==$scope.searchFields.length) {
			for(var i=0; i< results.length;i++){
				console.log("i is " + i);
				if ((ind==0 || regex.test(results[i].fields[ind-2])) && ( selectedTemplate == "All" || results[i].template == selectedTemplate ) ) {
					newResults.push(results[i]);
				}
			}
		}
		//tableRows.push(tableHead);
		if (i == results.length) {
			for (var k=0;k<newResults.length;k++) {
				tableHtml = tableHtml = "<tr>";
				tableCells = [];
				for (var l=0; l<newResults[k].fields.length;l++) {
					console.log(tableHtml);
					console.log("k is " + k + "l is " + l);
					tableCells.push(newResults[k].fields[l]);
					tableHtml = tableHtml + "<td>" + newResults[k].fields[l] + "</td>";
				}
				tableHtml = tableHtml + "</tr>";
				tableRows.push(tableCells);
			}
		}
		console.log(newResults.length);
		displayTable = "<table>" + tableHtml + "</table>";
		//$scope.table = $sce.trustAsHtml(tableRows);
		$scope.rows = tableRows
		$scope.tableRows = tableRows;
		$scope.headers = headers;
		$scope.tableCells = tableCells;
		var tableRowsComplete = "<tr>";
		for(var l=0;l<headers.length;l++) {
			tableRowsComplete = tableRowsComplete + "<th>" + headers[l] + "</th>";
		}
		tableRowsComplete = tableRowsComplete + "</tr>"
		for(var n=0; n<newResults.length; n++) {
			tableRowsComplete = tableRowsComplete + "<tr>";
			for (var o=0; o<newResults[n].fields.length; o++) {
				tableRowsComplete = tableRowsComplete + "<td>" + newResults[n].fields[o] + "</td>";
			}
			tableRowsComplete = tableRowsComplete + "</tr>";
		}
		/*for (var k=0;k<tableRows.length;k++) {
			tableRowsComplete = tableRowsComplete + tableRows[k];
		}  */
		console.log("New REsults Length is " + newResults.length);
		for (var m=0;m<tableCells.length;m++) {
			console.log("Table Cells is " + tableCells[m]);
		}
		$("#results").html(tableRowsComplete);
	}
	
	$scope.searchRecords = function() {
		console.log("valueToSearch is: " + $scope.valueToSearch);
		var searchHtmlReady = $scope.valueToSearch.replace(' ','-');
		$http.get('/api/search/' + searchHtmlReady)
		.success(function(r) {
			console.log(JSON.stringify(r));
			displayResults(r);
		})
		.error(function(err) {
			console.log(err);
		});
	}
	
}]);
