angular.module('dashboardModule', [])

	.controller('renderUserCtrl', function($scope, RenderUser){
		RenderUser.test();
		});
