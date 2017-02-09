angular.module('weatherApp', ['satellizer', 'ui.router', 'ngRoute'])
	.controller('MainController', MainController)
	.controller('HomeController', HomeController)
	.controller('LoginController', LoginController)
	.controller('SignupController', SignupController)
	.controller('LogoutController', LogoutController)
	.controller('ProfileController', ProfileController)
	.controller('WeatherController', WeatherController)
	.controller('AdminController', AdminController)
	.controller('SkiController', SkiController)
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
			// resolve: {
			// 	loginRequired: loginRequired
			// }
		})
		.state('ski', {
			url: '/ski',
			templateUrl: 'templates/ski.html',
			controller: 'SkiController',
			controllerAs: 'ski',
			// resolve: {
			// 	loginRequired: loginRequired
			// }
		})
		.state('admin', {
			url: '/admin',
			templateUrl: 'templates/admin.html',
			controller: 'AdminController',
			controllerAs: 'admin',
			// resolve: {
			// 	loginRequired: loginRequired
			// }
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
		console.log(vm.new_user);
		Account
			.login(vm.new_user)
			.then(function() {
				vm.new_user = {};
				$location.path('/weather');
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
		console.log(vm.new_user);
		Account
			.signup(vm.new_user)
			.then(
				function(response) {
					console.log(response);
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
				$('.weather.canvas').removeClass("weather");
				console.log("hit");
			});
	}
}

SkiController.$inject = ["$http", "$location", "Account"];
function SkiController($http, $location, Account) {
    var vm = this;
    vm.getSkiWeather = getSkiWeather;
    // vm.getSavedResorts = getSavedResorts;
    vm.getAllResorts = getAllResorts;
    vm.addResort = addResort;



    function getAllResorts() {
		$http
			.get('/api/resorts')
			.then(function(response) {
				vm.allResorts = response.data;
			});
	}

	getAllResorts();

	function getSkiWeather(location) {

		console.log(location);

		$http
			.get('/api/ski/' + location)
			.then(function(response) {
				vm.skiWeather = response;
				console.log(vm.skiWeather);
				$('.ski.canvas').removeClass("ski");
				console.log("hit");
			});
	}

	function addResort(user_id, resort_id) {
		console.log(user_id);
		console.log(resort_id);
		var preference = {
			user_id: user_id,
			resort_id: resort_id
		}

		// var preference.user_id = user_id;
		// var preference.resort_id = resort_id;
		$http
			.post('/api/preferences/', preference)
			.then(function(response) {
				vm.addedResort = response.data;
				console.log(vm.addedResort);
				getSavedResorts();
			})
	}

 //    function getSavedResorts(zip_code) {
 //    	console.log(zip_code);
	// 	$http
	// 		.get('/api/resorts/' + zip_code)
	// 		.then(function(response) {
	// 			console.log(response.data);
	// 			vm.savedResorts = response.data;
	// 		});
	// }

	// getSavedResorts();
    // function getSavedResorts(){
    //     console.log("getSavedResorts");


    //     vm.currentUser = function() {
    //     // console.log(Account.currentUser.displayName);
    //     return Account.currentUser();
    // }
    //     $http
    //         .get('/api/ski/resorts')
    // }
}

AdminController.$inject = ["$http", "$location", "$routeParams", "Account"];
function AdminController($http, $location, $routeParams, Account) {
	var vm = this;
	vm.getAllUsers = getAllUsers;
	vm.deleteUser = deleteUser;
	vm.getOneUser = getOneUser;
	vm.getUser = getUser;
	vm.updateUser = updateUser;

	// Index Users

	function getAllUsers() {
		console.log('getAllUsers');
		$http
			.get('/api/users')
			.then(function(response) {
				console.log(response.data);
				vm.allUsers = response.data;
			});
	}

	getAllUsers();

	// Delete User

	function deleteUser(user) {
		console.log(user.id);
		console.log('deleteUser');
		$http
			.get('/api/users/' + user.id)
			.then(function(response) {
				var userIndex = vm.allUsers.indexOf(user);
				vm.allUsers.splice(userIndex, 1);
			})
	}

	// Show One User

	function getOneUser(user) {
		console.log('getOneUser');
		$http
			.get('/api/users/' + $routeParams.id)
			.then(function(response) {
				vm.oneUser = repsonse.data;
			});
	}

	// Update User

	function getUser() {
		console.log('getUser');
		$http
			.get('/api/users/' + $routeParams.id)
			.then(function(response) {
				vm.updatedUser = response.data;
			});
	}

	function updateUser(user) {
		console.log('updateUser');
		console.log(user);
		$http
			.get('/api/users/' + user.id, vm.user)
			.then(function(response) {
				var user = response.data;
				$location.path('/admin');
			});

	getUser();

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
						self.currentUser_id = response.data.user.id;
						console.log(response);
						$auth.setToken(response.data.token);
					},
					function onError(error) {
						console.error(error);
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
						console.log(response);
						// self.currentUser_id = response.data.user.id;
						$auth.setToken(response.data.token);
					},
					function onError(error) {
						console.error(error);
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
		console.log(self.user);
		if ( self.user ) { return self.user; }
		if ( !$auth.isAuthenticated() ) { return null; }

		var deferred = $q.defer();
		getProfile().then(
			function onSuccess(response) {
				console.log(response.data);
				self.user = response.data;
				deferred.resolve(self.user);
			},
			function onError() {
				$auth.logout();
				self.user = null;
				deferred.reject();
			}
		)
		self.user = promise = deferred.promise;
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

//  for Tech Modal



// 








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
