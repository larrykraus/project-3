angular.module('weatherApp')
	.controller('UserController', UserController)

UserController.$inject = ['$http', '$routeParams', '$location'];
function UserController($http, $routeParams, $location) {
	var vm = this;
	vm.getAllUsers = getAllUsers;
	vm.deleteUser = deleteUser;
	vm.getOneUser = getOneUser;
	vm.saveUser = saveUser;
	vm.getUser = getUser;
	vm.updateUser = updateUser;
	vm.getWeather = getWeather;

	// Get All Users

	function getAllUsers() {
		console.log('getAllUsers');
		$http
			.get('/api/users')
			.then(function(response) {
				console.log(response.data);
				vm.allUsers = response.data;
			});
	}

	// Delete One User

	function deleteUser(user) {
		console.log('deleteUsers');
		$http
			.get('api/users' + user.id)
			.then(function(response) {
				var userIndex = vm.allUsers.indexOf(user);
				vm.allUsers.splice(userIndex, 1);
			})
	}

	// Show One User

	function getOneUser(user) {
		console.log('getOneUser');
		$http
			.get('/api/users' + $routeParams.id)
			.then(function(response) {
				vm.oneUser = repsonse.data;
			});
	}

	// Create New User

	function saveUser(newUser) {
		console.log('saveUser');
		$http
			.post('/api/users', vm.newUser)
			.then(function(repsonse) {
				var user = response.data;
				$location.path('/users/' + user.id);
			});
	}

	// Update User

	function getUser() {
		console.log('getUser');
		$http
			.get('/api/users' + $routeParams.id)
			.then(function(response) {
				vm.updatedUser = response.data;
			});
	}

	function updateUser() {
		console.log('updateUser');
		$http
			.get('/api/users' + $routeParams.id, vm.updatedUser)
			.then(function(response) {
				var user = response.data;
				$location.path('/display');
			});

	getUser();
	}

	// Get Weather

	function getWeather(location) {
		console.log('getWeather');
		console.log(vm.location);
		$http
			.get('/api/weather/' + vm.location)
			.then(function(response) {
				vm.weather = response;
				console.log(vm.weather);
			});

	console.log('reached');
	}
}

