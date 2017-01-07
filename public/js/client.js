angular.module('weatherApp', ['ngRoute'])
	.config(function($routeProvider, $locationProvider) {
		console.log('Yippee client.js')
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});

		$routeProvider

		// Main Routes
		.when('/', {
			templateUrl: '/templates/welcome.html'
		})
		.when('/login', {
			templateUrl: '/templates/login.html'
		})
		.when('/display', {
			templateUrl: '/templates/display.html'
		})
		.when('/admin', {
			templateUrl: '/templates/admin.html'
		})
	})