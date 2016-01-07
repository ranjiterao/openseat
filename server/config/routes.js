var usersController = require('./../components/users/usersController');
var routesController = require('./../components/routes/routesController');
var passport = require('./passport');

module.exports = function (app, express) {
  app.get('/api/users', usersController.getUsers);
  app.get('/api/inserTestData', usersController.insertTestData);

  app.post('/api/passengerRoute', routesController.insertPassengerRoute);
  app.get('/api/passengerRoute', routesController.getPassengerRoutes);

  app.post('/api/driverRoute', routesController.insertDriverRoute);
  app.get('/api/driverRoute', routesController.getDriverRoutes);

  app.get('/api/keepalive', function(req, res){
    res.status(200).json({message: "all ok from the server"});
  });

  app.get('/api/auth/facebook',
    passport.authenticate('facebook'),
    function(req, res){
      // The request will be redirected to Facebook for authentication, so this
      // function will not be called.
    });

  // GET /auth/facebook/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  If authentication fails, the user will be redirected back to the
  //   login page.  Otherwise, the primary route function function will be called,
  //   which, in this example, will redirect the user to the home page.
  app.get('/api/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/#/login' }),
    function(req, res) {
      res.redirect('/#/');
    });

  app.get('/api/logout', function(req, res){
    req.logout();
    res.redirect('/#/login');
  });
};