(function () {
	'use strict';
	angular.module('dbproject')
	.controller('homeController', ['$scope', '$http', 'dbService', function($scope, $http, dbService) {
		$scope.searchByOptions = ['Title', 'Actor', 'Writer', 'Director', 'Country', 'Language'];
		$scope.selectedSearchByOption = $scope.searchByOptions[0];

		$scope.recordsFrom = 1;
		$scope.recordsTo = 100;
		$scope.totalRecords = 100;

		$scope.searchCond = {
			searchString : '',
			selectedYear : '',
			selectedGenre : ''
		};
		
		$scope.searchObj = {};
		
		$scope.searchString = '';
		$scope.selectedYear = '';
		$scope.selectedGenre = {};
		
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
		
		getGenre();
		function getGenre(){
			dbService.getGenre(function(response,status){
				if(status==200)
				{
					$scope.genres = response;
				}else{
					console.log('Unfortunately no Genres in DB');
				}
			});
		}
		// Function to get movie details from the database
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
		//$scope.show_form = true;
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
			$('#DetailsPage').css('display', 'none');
		};

		$scope.showDetails = function(detail) {
			dbService.fetchDetailedMovieInfo(detail.imdb_id, function (response, status) {
				if (status == 200) {
					$scope.selectedMovie = response;
					hideAllDialog();
					$('#DetailsPage').slideToggle();
				} else {
					alert('Unable to fetch detailed info.');
				}
			});
		};
		
		$scope.search = function() {
			var selectedGenreName = '';
			if ($scope.searchCond.selectedGenre) {
				selectedGenreName = $scope.searchCond.selectedGenre.name;
			}
			
			document.getElementById('searchString');

			$scope.recordsFrom = 1;
			$scope.recordsTo = 100;
			
			$scope.searchObj = {
				selectedSearchByOption : $scope.selectedSearchByOption,
				searchString : $scope.searchCond.searchString ? $scope.searchCond.searchString : '',
				selectedYear : $scope.searchCond.selectedYear ? $scope.searchCond.selectedYear : '',
				minRating : $scope.slider.minValue,
				maxRating : $scope.slider.maxValue,
				selectedGenre : selectedGenreName,
				offset : 0,
				noOfRows : 0
			}

			dbService.fetchSearchMoviesCount($scope.searchObj, function (response, status) {
				if (status == 200) {
					if (response != "" || response != '0') {
						$scope.totalRecords = parseInt(response.count);
						
						if ($scope.recordsTo > $scope.totalRecords) {
							$scope.recordsTo = $scope.totalRecords;
						} else {
							$scope.recordsTo = 100;
						}

						$scope.searchObj.offset = 0;
						$scope.searchObj.noOfRows = ($scope.recordsTo - $scope.recordsFrom) + 1;

						dbService.fetchSearchMovies($scope.searchObj, function (response, status) {
							if (status == 200) {
								$scope.details = response;
							} else {
								alert('Unable to perform search.');
							}
						});
					} else {
						alert('No data matches search requirement. Please try with different search parameters');
					}
				} else {
					alert('Unable to perform search.');
				}
			});
		};

		$scope.fetchPrev100 = function() {
			$scope.recordsFrom = $scope.recordsFrom - 100;
			$scope.recordsTo = $scope.recordsTo - 100;
			
			$scope.searchObj.offset = $scope.recordsFrom - 1;
			$scope.searchObj.noOfRows = ($scope.recordsTo - $scope.recordsFrom) + 1;

			dbService.fetchSearchMovies($scope.searchObj, function (response, status) {
				if (status == 200) {
					$scope.details = response;
				} else {
					alert('Unable to fetch next result set.');
				}
			});
		};

		$scope.fetchNext100 = function() {
			$scope.recordsFrom = $scope.recordsFrom + 100;

			if (($scope.recordsTo + 100) > $scope.totalRecords) {
				$scope.recordsTo = $scope.totalRecords;
			} else {
				$scope.recordsTo = $scope.recordsTo + 100;
			}

			$scope.searchObj.offset = $scope.recordsFrom - 1;
			$scope.searchObj.noOfRows = ($scope.recordsTo - $scope.recordsFrom) + 1;

			dbService.fetchSearchMovies($scope.searchObj, function (response, status) {
				if (status == 200) {
					$scope.details = response;
				} else {
					alert('Unable to fetch next result set.');
				}
			});
		};
	}]);
})();
