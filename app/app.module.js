(function () {
	'use strict';
	var app = angular.module('dbproject', ['ngCookies', 'ui.router', 'rzModule', 'angularUtils.directives.dirPagination']);

	app.config(function ($httpProvider, $stateProvider, $urlRouterProvider) {
		$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'app/views/home.html'
		});

		$urlRouterProvider.otherwise('home');

		$httpProvider.defaults.headers.common = {};
		$httpProvider.defaults.headers.post = {};
		$httpProvider.defaults.headers.put = {};
		$httpProvider.defaults.headers.patch = {};
	});

	app.run(['$rootScope', '$cookieStore',
	function ($rootScope, $cookieStore) {
		$rootScope.isAdminLoggedIn = $cookieStore.get('isAdminLoggedIn') || false;
		$rootScope.user = $cookieStore.get('dbUser') || {};
	}]);

})();