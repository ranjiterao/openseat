angular.module('dashboardModule', [])

	.controller('renderUserCtrl', function($scope, RenderUser){
		RenderUser.renderPassenger('placeholder' ,$scope);
		console.log($scope.routes[1].confirmedDriverRoute)
		if($scope.routes[1].confirmedDriverRoute){
			$scope.routes[1].driver = {};
			$scope.routes[1].driver.name = 'Dave';
			$scope.routes[1].driver.phoneNumber = '408-355-3333'
		} else {
			$scope.routes[0].driver = '';
		}
		});
