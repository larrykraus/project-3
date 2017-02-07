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
			templateUrl: '/templates/welcome.html',
			controller: 'UserController as userController'
		})
		.when('/login', {
			templateUrl: '/templates/login.html',
			controller: 'UserController as userController'
		})
		.when('/weather', {
			templateUrl: '/templates/weather.html',
			controller: 'UserController as userController'
		})
		.when('/admin', {
			templateUrl: '/templates/admin.html',
			controller: 'UserController as userController'
		})
		// Guy did this, he might have messed up
		.when('/ski', {
			templateUrl: '/templates/ski.html',
			controller: 'SkiController as skiController'
		});

	});



// start animation toggle .slideIn class to start 
