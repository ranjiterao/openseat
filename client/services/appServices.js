angular.module('openSeat.services', [])
	.factory('RenderUser', function($http) {

	var userMethods = {};

	userMethods.getUser = function(driverCallback, passengerCallback) {
		$http.get('/api/users/:userId').
		then(function(user) {
			if (user.IsDriver) {
				driverCallback(user);
			} else {
				passengerCallback(user);
			}
		});
	};
	userMethods.renderDriver = function(user, $scope) {
		$scope.username = user.name;
		$scope.picture = user.picture;
		$scope.routes = user.DriverRoutes;
	};
	userMethods.showUser = function(user, $scope) {
		$scope.username = user.name;
		$scope.picture = user.picture;
		$scope.routes = user.PassengerRoutes;
	};
	userMethods.test = function(){
		console.log('hello!');
	};

	return userMethods;
});