angular.module('openSeatApp', ['ngRoute', 'openSeat.services', 'dashboardModule'])
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
      when('/home', {
        templateUrl: './components/dashboard/dashboardView.html',
        controller: 'renderUserCtrl',
      }).
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