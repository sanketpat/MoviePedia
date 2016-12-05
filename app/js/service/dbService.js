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

		this.getMovies = function (callback) {
			// Sending request to EmpDetails.php files
			$http.get('databaseFiles/movieDetails.php')
			.success(function (data, status) {
				callback(data, status);
			})
			.error(function (data, status) {
				callback(data, status);
			});
		};

		this.addMovie = function (movie, callback) {
			$http.post('databaseFiles/insertDetails.php', employee, config)
			.success(function (status) {
				callback(status);
					console.log(status);
			})
			.error(function (status) {
				callback(status);
				console.log(status);
			});
		};

		this.updateEmployee = function (movie, callback) {
			$http.put('databaseFiles/updateDetails.php', movie, config)
			.success(function (response, status) {
				callback(status);
			})
			.error(function (status) {
				callback(status);
			});
		};

		this.deleteMovie = function (movie, callback) {
			$http.post('databaseFiles/deleteDetails.php', movie, config)
			.success(function (response, status) {
				callback(status);
						console.log(status);
			})
			.error(function (status) {
				callback(status);
				console.log(status);
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
