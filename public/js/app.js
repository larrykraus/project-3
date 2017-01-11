angular.module('weatherApp', ['satellizer', 'ui.router'])
	.controller('MainController', MainController)
	.controller('HomeController', HomeController)
	.controller('LoginController', LoginController)
	.controller('SignupController', SignupController)
	.controller('LogoutController', LogoutController)
	.controller('ProfileController', ProfileController)
	.controller('WeatherController', WeatherController)
	.service('Account', Account)
	.config(configRoutes);

configRoutes.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"];
function configRoutes($stateProvider, $urlRouterProvider, $locationProvider) {
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});

	$urlRouterProvider.otherwise("/");

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'templates/welcome.html',
			controller: 'HomeController',
			controllerAs: 'home'
		})
		.state('signup', {
			url: '/signup',
			templateUrl: 'templates/signup.html',
			controller: 'SignupController',
			controllerAs: 'sc',
			resolve: {
				skipIfLoggedIn: skipIfLoggedIn
			}
		})
		.state('login', {
			url: '/login',
			templateUrl: 'templates/login.html',
			controller: 'LoginController',
			controllerAs: 'lc',
			resolve: {
				skipIfLoggedIn: skipIfLoggedIn
			}
		})
		.state('logout', {
			url: '/logout',
			template: null,
			controller: 'LogoutController',
			resolve: {
				loginRequired: loginRequired
			}
		})
		.state('profile', {
			url: '/profile',
			templateUrl: 'templates/profile.html',
			controller: 'ProfileController',
			controllerAs: 'profile',
			resolve: {
				loginRequired: loginRequired
			}
		})
		.state('weather', {
			url: '/weather',
			templateUrl: 'templates/weather.html',
			controller: 'WeatherController',
			controllerAs: 'weather',
			resolve: {
				loginRequired: loginRequired
			}
		})

		function skipIfLoggedIn($q, $auth) {
			var deferred = $q.defer();
			if ($auth.isAuthenticated()) {
				deferred.reject();
			} else {
				deferred.resolve();
			}
			return deferred.promise;
		}

		function loginRequired($q, $location, $auth) {
			var deferred = $q.defer();
			if ($auth.isAuthenticated()) {
				deferred.resolve();
			} else {
				$location.path('/login');
			}
			return deferred.promise;
		}
}


MainController.$inject = ["Account"];
function MainController(Account) {
	var vm = this;

	vm.currentUser = function() {
		// console.log(Account.currentUser.displayName);
		return Account.currentUser();
	}
}

HomeController.$inject = ["$http"];
function HomeController($http) {
	var vm = this;
	vm.posts = [];
	vm.new_post = {};

	$http.get('/api/posts')
		.then(function(response) {
			vm.posts = response.data;
		});

	vm.createPost = function() {
		$http.post('/api/posts', vm.new_post)
			.then(function(response) {
				vm.new_post = {};
				vm.posts.push(response.data);
			});
	};
}

LoginController.$inject = ["$location", "Account"];
function LoginController($location, Account) {
	var vm = this;
	vm.new_user = {};

	vm.login = function() {
		Account
			.login(vm.new_user)
			.then(function() {
				vm.new_user = {};
				$location.path('/profile');
			})
	};

	// vm.signup = function(newUser) {
	// 	console.log('Hello ' + newUser);
	// 	Account
	// 		.signup(vm.new_user)
	// 		.then(
	// 			function(response) {
	// 				vm.new_user = {};
	// 				$location.path('/profile');
	// 			})
	// };
}

SignupController.$inject = ["$location", "Account"];
function SignupController($location, Account) {
	var vm = this;
	vm.new_user = {};

	vm.signup = function(newUser) {
		console.log('Hello ' + newUser);
		Account
			.signup(vm.new_user)
			.then(
				function(response) {
					vm.new_user = {};
					$location.path('/weather');
				})
	};
}

LogoutController.$inject = ["$location", "Account"];
function LogoutController($location, Account) {
	Account
		.logout()
		.then(function() {
			$location.path('/login');
		});
}

ProfileController.$inject = ["$location", "Account"];
function ProfileController($location, Account) {
	var vm = this;
	vm.new_profile = {};

	vm.updateProfile = function() {
		Account
			.updateProfile(vm.new_profile)
			.then(function() {
				vm.showEditForm = false;
			});
	};
}

WeatherController.$inject = ["$http", "$location", "Account"];
function WeatherController($http, $location, Account) {
	var vm = this;
	vm.getWeather = getWeather;

	function getWeather(location) {
		console.log('getWeather');
		console.log(vm.location);
		$http
			.get('/api/weather/' + vm.location)
			.then(function(response) {
				vm.weather = response;
				console.log(vm.weather);
			});
	}
}




Account.$inject = ["$http", "$q", "$auth"];
function Account($http, $q, $auth) {
	var self = this;
	self.user = null;

	self.signup = signup;
	self.login = login;
	self.logout = logout;
	self.currentUser = currentUser;
	self.getProfile = getProfile;
	self.updateProfile = updateProfile;

	function signup(userData) {
		console.log(userData);
		return (
			$auth
				.signup(userData)
				.then(
					function onSuccess(response) {
						console.log(response);
						$auth.setToken(response.data.token);
					},
					function onError(error) {
						console.log(error);
					}
				)
		);
	}

	function login(userData) {
		return (
			$auth
				.login(userData)
				.then(
					function onSuccess(response) {
						$auth.setToken(response.data.token);
					},
					function onError(error) {
						console.log(error);
					}
				)
		);
	}

	function logout() {
		return (
			$auth
				.logout()
				.then(function() {
					self.user = null;
				})
		);
	}

	function currentUser() {
		if ( self.user ) { return self.user; }
		if ( !$auth.isAuthenticated() ) { return null; }

		var deferred = $q.defer();
		getProfile().then(
			function onSuccess(response) {
				console.log(response);
				self.user = response.data;
				deferred.resolve(self.user);
			},
			function onError(response) {
				$auth.logout();
				self.user = null;
				deferred.reject();
			}
		)
		self.user = promise = deferred.promise;
		console.log(promise);
		return promise;
	}

	function getProfile() {
		return $http.get('/api/me');
	}

	function updateProfile(profileData) {
		return (
			$http
				.put('/api/me', profileData)
				.then(
					function(response) {
						self.user = response.data;
					}
				)
		);
	}
}











	// .config(function($routeProvider, $locationProvider) {
	// 	console.log('Yippee client.js')
	// 	$locationProvider.html5Mode({
	// 		enabled: true,
	// 		requireBase: false
	// 	});

	// 	$routeProvider

	// 	// Main Routes
	// 	.when('/', {
	// 		templateUrl: '/templates/welcome.html',
	// 		controller: 'UserController as userController'
	// 	})
	// 	.when('/login', {
	// 		templateUrl: '/templates/login.html',
	// 		controller: 'UserController as userController'
	// 	})
	// 	.when('/display', {
	// 		templateUrl: '/templates/display.html',
	// 		controller: 'UserController as userController'
	// 	})
	// 	.when('/admin', {
	// 		templateUrl: '/templates/admin.html',
	// 		controller: 'UserController as userController'
	// 	});

	// });
