angular.module('openSeat.services', [])
	.factory('RenderUser', function($http) {

		var userMethods = {};

		// $scope can only be used in controllers, not in services or factories
		// in order to use the $scope object, it needs to be passed as an argument
		// when the method gets invoked in the controller.

		userMethods.getUser = function(driverCallback, passengerCallback, $scope) {
			$http.get('/api/users/:userId') //TODO finish the path to specific user
				.then(function(user) {
					if (user.IsDriver) {
						driverCallback(user, $scope);
					} else {
						passengerCallback(user, $scope);
					}
				});
		};
		userMethods.renderDriver = function(user, $scope) {
			user = {
				name: 'John Doe',
				DriverRoutes: [{
					name: 'someRoute'
				}, {
					name: 'anotherRoute'
				}]
			};
			$scope.username = user.name;
			$scope.picture = user.picture;
			$scope.routes = user.DriverRoutes;
		};
		userMethods.renderPassenger = function(user, $scope) {
			user = {
				name: 'John Doe',
				PassengerRoutes: [{
					start: 'San Mateo',
					end: 'San Francisco',
					days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
					fromHour: 7,
					fromMinutes: 30,
					toHour: 8,
					toMinutes: 30,
					confirmedDriverRoute: false,
				}, {
					start: 'San Francisco',
					end: 'San Mateo',
					days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
					fromHour: 18,
					fromMinutes: 30,
					toHour: 19,
					toMinutes: 30,
					confirmedDriverRoute: true,
				}]
			};
			$scope.username = user.name;
			$scope.picture = user.picture;
			$scope.routes = user.PassengerRoutes;
		};

		return userMethods;
	});