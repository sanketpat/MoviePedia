(function () {
	'use strict';
	angular.module('dbproject')
	.controller('homeController', ['$scope', '$http', 'dbService', function($scope, $http, dbService) {
		$scope.searchByOptions = ['Title', 'Actor', 'Writer', 'Director', 'Country', 'Language'];
		$scope.selectedSearchByOption = $scope.searchByOptions[0];

		// Fetch Genres from DB
		$scope.genres = ['Select Genre', 'Action', 'Comedy'];
		$scope.selectedGenre = $scope.genres[0];

		$scope.slider = {
			minValue: 0,
			maxValue: 10,
			options: {
				floor: 0,
				ceil: 10,
				step: 1,
				showTicks: true,
				onChange: function(id) {
					//console.log('on change ' + id);
				}
			}
		};

		// Function to get employee details from the database
		getInfo();
		function getInfo() {
			dbService.getMovies(function (response, status) {
				if (status == 200) {
					// Stored the returned data into scope
					$scope.details = response;
				} else {
					alert('Unable to fetch Movie details');
				}
			});
		}

		// Enabling show_form variable to enable Add employee button
		$scope.show_form = true;
		// Function to add toggle behaviour to form
		$scope.formToggle = function() {
			hideAllDialog();
			$('#movieForm').slideToggle();
		}

		$scope.insertInfo = function(info) {
			dbService.addMovie(info, function (status) {
				if (status == '1') {
					getInfo();
					$('#form').css('display', 'none');
				} else {
					alert('Unable to Add movie details');
				}

				hideAllDialog();
			});
		}

		$scope.currentUser = {};
		$scope.editInfo = function(info) {
			$scope.currentMovie = info;
			//$('#form').slideUp();
			hideAllDialog();
			$('#editForm').slideToggle();
		};

		$scope.UpdateInfo = function(info) {
			dbService.updateMovie(info, function (status) {
				if (status == 200) {
					$scope.show_form = true;
					getInfo();
				} else {
					alert('Unable to Update Movie details');
				}

				hideAllDialog();
			});
		}

		$scope.deleteInfo = function(info) {
			dbService.deleteMovie(info, function (status) {
				if (status == 200) {
					getInfo();
				} else {
					alert('Unable to delete employee details');
				}
			});
		};

		$scope.cancel = function() {
			hideAllDialog();
		};

		$scope.openLoginDialog = function() {
			hideAllDialog();
			$('#adminLogin').slideToggle();
		};

		$scope.login = function() {
			dbService.login($scope.user, function (status) {
				if (status == 200) {
					// do something
				} else {
					alert('Unable to sign-in.');
				}

				hideAllDialog();
			});
		};

		var hideAllDialog = function() {
			$('#editForm').css('display', 'none');
			$('#movieForm').css('display', 'none');
			$('#adminLogin').css('display', 'none');
		};

		$scope.showDetails = function(detail) {
			hideAllDialog();
		};
	}]);
})();
