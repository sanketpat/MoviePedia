(function () {
	'use strict';
	angular.module('dbproject')
	.controller('homeController', ['$scope', '$http', 'employeeService', function($scope, $http, employeeService) {

		// Function to get employee details from the database
		getInfo();
		function getInfo() {
			employeeService.getEmployees(function (response, status) {
				if (status == 200) {
					// Stored the returned data into scope
					$scope.details = response;
				} else {
					alert('Unable to fetch employee details');
				}
			});
		}

		// Enabling show_form variable to enable Add employee button
		$scope.show_form = true;
		// Function to add toggle behaviour to form
		$scope.formToggle = function(){
			$('#empForm').slideToggle();
			$('#editForm').css('display', 'none');
		}

		$scope.insertInfo = function(info) {
			employeeService.addEmployee(info, function (status) {
				if (status == '1') {
					getInfo();
					$('#form').css('display', 'none');
				} else {
					alert('Unable to update employee details');
				}
			});
		}

		$scope.currentUser = {};
		$scope.editInfo = function(info) {
			$scope.currentUser = info;
			$('#form').slideUp();
			$('#editForm').slideToggle();
		};

		$scope.UpdateInfo = function(info) {
			employeeService.updateEmployee(info, function (status) {
				if (status == 200) {
					$scope.show_form = true;
					getInfo();
				} else {
					alert('Unable to add employee details');
				}
			});
		}

		$scope.deleteInfo = function(info) {
			employeeService.deleteEmployee(info, function (status) {
				if (status == 200) {
					getInfo();
				} else {
					alert('Unable to delete employee details');
				}
			});
		}
	}]);
})();