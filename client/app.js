var openSeatApp = angular.module('openSeatApp', ['ngRoute'])
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
      when('/createRoute', {
        templateUrl: './components/routeSetup/routeSetupView.html',

      });
      // when('/phones/:phoneId', {
      //   templateUrl: 'partials/phone-detail.html',
      //   controller: 'PhoneDetailCtrl'
      // }).
      // otherwise({
      //   redirectTo: '/phones'
      // });
    }
  ]);