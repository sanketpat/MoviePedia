(function () {
	'use strict';
	angular.module('dbproject')
	.service('dbService', ['$http', function ($http) {
		var dbService = this;
		var userId = 0;
		var config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		this.getEmployees = function (callback) {
			// Sending request to EmpDetails.php files
			$http.get('databaseFiles/empDetails.php')
			.success(function (data, status) {
				callback(data, status);
			})
			.error(function (data, status) {
				callback(data, status);
			});
		};

		this.addEmployee = function (employee, callback) {
			$http.post('databaseFiles/insertDetails.php', employee, config)
			.success(function (status) {
				callback(status);
			})
			.error(function (status) {
				callback(status);
			});
		};

		this.updateEmployee = function (employee, callback) {
			$http.put('databaseFiles/updateDetails.php', employee, config)
			.success(function (response, status) {
				callback(status);
			})
			.error(function (status) {
				callback(status);
			});
		};

		this.deleteEmployee = function (employee, callback) {
			$http.post('databaseFiles/deleteDetails.php', employee, config)
			.success(function (response, status) {
				callback(status);
			})
			.error(function (status) {
				callback(status);
			});
		};

		this.login = function (user, callback) {
			$http.post('databaseFiles/login.php', user, config)
			.success(function (status) {
				callback(status);
			})
			.error(function (status) {
				callback(status);
			});
		};
	}]);
})();