var openSeatApp = angular.module('openSeatApp', ['ngRoute'])
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
      when('/createRoute', {
        templateUrl: './components/routeSetup/routeSetupView.html',

      }).
      when('/about', {
        templateUrl: './components/about/aboutView.html',
      }).
      when('/login', {
        templateUrl: './components/login/loginView.html',
      }).
      otherwise({
        redirectTo: '/home'
      });
    }
  ]);