angular.module('selectDriverModule', ['ngMap'])
  .controller('selectDriverCtrl', function($scope, $rootScope, $routeParams, Routes, ngMap){
    var passengerRouteId = $routeParams.id;
    $scope.driverRoutes = {};


    NgMap.getMap().then(function (map) {
      $scope.googleMapsUrl = 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap';

      var initializeDriverRoutes = function(passengerRouteId){
        Routes.bestDriverRoutesForPassengerRouteId(passengerRouteId, function(driverRoutes){
          $scope.driverRoutes = driverRoutes;
        });
      };

      if (passengerRouteId) {
        initializeDriverRoutes(passengerRouteId);
      }

      $scope.selectDriverRoute = function(driverRouteId){
      Routes.userInterestedInDriverRoute(passengerRouteId, driverRouteId);
      //TODO show something in the view that confirms the driverRoute was added
      };
    });
  });