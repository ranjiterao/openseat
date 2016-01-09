angular.module('routeSetupModule', [])
	.controller('routeSetupCtrl', function(PostPassengerRoute, $scope, $rootScope){

		$scope.submitRoute = function(){
			var startX = $('#startX').val();
			var startY = $('#startY').val();
			var endX = $('#endX').val();
			var endY = $('#endY').val();
			var monday = $('#monday').prop('checked');
			var tuesday = $('#tuesday').prop('checked');
			var wednesday = $('#wednesday').prop('checked');
			var thursday = $('#thursday').prop('checked');
			var friday = $('#friday').prop('checked');
			var saturday = $('#saturday').prop('checked');
			var sunday = $('#sunday').prop('checked');

			var routeObj = {};
			routeObj.start = [Number(startX), Number(startY)];
			routeObj.end = [Number(endX), Number(endY)];
			routeObj.days = [monday, tuesday, wednesday, thursday, friday, saturday, sunday];
			routeObj.fromHour = Number($('#fromHour').val());
			routeObj.fromMinutes = Number($('#fromMinutes').val());
			routeObj.toHour = Number($('#toHour').val());
			routeObj.toMinutes = Number($('#toMinutes').val());
			routeObj.seats = Number($('#seats').val());
			routeObj.fee = Number($('#fee').val());



			var data = {};
			data.route = routeObj;
			data.userId = $rootScope.user._id;
			console.log(data);
			PostPassengerRoute.newRoute(data);
		};
	});