angular.module('weatherApp')
	.controller('UserIndexController', UserIndexController)
	.controller('UserShowController', UserShowController)
	.controller('UserEditController', UserEditController)
	.controller('UserNewController', UserNewController);

UserIndexController.$inject = ['$http'];
function UserIndexController($http) {
	var vm = this;
	vm.getAllUsers = getAllUsers;

	function getAllUsers() {
		console.log('getAllUsers');
		$http
			.get('/api/users')
			.then(function(response) {
				vm.allUsers = response.data;
			});
	}

	function deleteUser(user) {
		console.log('deleteUsers');
		$http
			.get('api/users' + user.id)
			.then(function(response) {
				var userIndex = vm.allUsers.indexOf(user);
				vm.allUsers.splice(userIndex, 1);
			})
	}

	getAllUsers();
}

UserShowController.$inject = ['$http', '$routeParams'];
function UserShowController($http, $routeParams) {
	var vm = this;

	function getOneUser(user) {
		console.log('getOneUser');
		$http
			.get('/api/users' + $routeParams.id)
			.then(function(response) {
				vm.oneUser = repsonse.data;
			});
	}

	getOneUser();
}

UserNewController.$inject = ['$http', '$location'];
function UserNewController($http, $location) {
	var vm = this;
	vm.saveUser = saveUser;

	function saveUser(newUser) {
		console.log('saveUser');
		$http
			.post('/api/users', vm.newUser)
			.then(function(repsonse) {
				var user = response.data;
				$location.path('/users/' + user.id);
			});
	}
}

UserEditController.$inject = ['$http', '$routeParams', '$location'];
function UserEditController($http, $routeParams, $location) {
	var vm = this;
	vm.updatedUser = updatedUser;

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
}