angular.module('selectDriverModule', [])
  .controller('selectDriverCtrl', function($scope, $rootScope, $routeParams, Routes){
    var passengerRouteId = $routeParams.id;
    $scope.driverRoutes = {};

    var initializeDriverRoutes = function(passengerRouteId){
      Routes.bestDriverRoutesForPassengerRouteId(passengerRouteId, function(driverRoutes){
        $scope.driverRoutes = driverRoutes;
      });
    };

    if (passengerRouteId) {
      initializeDriverRoutes(passengerRouteId);
    }

    $scope.selectDriverRoute = function(driverRouteId){

      this.route.selected = true;
      console.log(route.selected)
      Routes.userInterestedInDriverRoute(passengerRouteId, driverRouteId);
      //TODO show something in the view that confirms the driverRoute was added
    };
  });