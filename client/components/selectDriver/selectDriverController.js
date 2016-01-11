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
      Routes.userInterestedInDriverRoute(passengerRouteId, driverRouteId, function(){
        //TODO show something in the view that confirms the driverRoute was added
      });
    };
  });