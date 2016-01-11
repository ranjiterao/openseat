angular.module('dashboardModule', [])

.controller('renderUserCtrl', function($scope, RenderUser, $rootScope, Routes) {


// This function takes an array of routes and iterates over it replacing the array of booleans
// that represend the days and returns a string with the requested days.

	var setDays = function(arrayOfRoutes) {
		var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
		for (var i = 0; i < arrayOfRoutes.length; i++) {
			arrayOfRoutes[i].days = arrayOfRoutes[i].days.reduce(function(memo, day, index) {
				if (day) {
					memo = memo.concat(days[index] + ' ');
				}
				return memo;
			}, '');
		}
		return arrayOfRoutes;
	};

	var initializePassengerRoutes = function(passengerId) {
		Routes.getPassengerRoutesForUserId(passengerId, function(passengerRoutes) {
			$scope.passengerRoutes = setDays(passengerRoutes);
		});
	};

	var initializeDriverRoutes = function(driverId) {
		Routes.getDriverRoutesForUserId(driverId, function(driverRoutes) {
			$scope.driverRoutes = setDays(driverRoutes);
		});
	};

	$scope.deleteConfirmedPassenger = function(passengerRouteId) {};

	$scope.confirmPassenger = function(passengerRouteId, driverRouteId) {
		Routes.driverConfirmsPassenger(driverRouteId, passengerRouteId, function() {
			//TODO
		});
	};

	$scope.username = 'Hello ' + $rootScope.user.name;
	if ($rootScope.user.IsDriver) {
		initializeDriverRoutes($rootScope.user._id);
	} else {
		initializePassengerRoutes($rootScope.user._id);
	}
});