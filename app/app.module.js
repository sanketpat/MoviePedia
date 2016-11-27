(function () {
	'use strict';
	var app = angular.module('dbproject', ['ngCookies', 'ui.router']);

	app.config(function ($httpProvider, $stateProvider, $urlRouterProvider) {
		$stateProvider
		.state('home', {
			url: '/home',
			controller: 'homeController',
			templateUrl: 'app/views/home.html'
		})
		.state('login', {
			url: '/login',
			controller: 'loginController',
			templateUrl: 'app/views/login.html'
		})

		$urlRouterProvider.otherwise('home');

		$httpProvider.defaults.headers.common = {};
		$httpProvider.defaults.headers.post = {};
		$httpProvider.defaults.headers.put = {};
		$httpProvider.defaults.headers.patch = {};
	});

	app.run(['$rootScope', '$cookieStore',
	function ($rootScope, $cookieStore) {
		$rootScope.isLoggedIn = $cookieStore.get('isLoggedIn') || false;
		$rootScope.user = $cookieStore.get('user') || {};
	}]);

})();