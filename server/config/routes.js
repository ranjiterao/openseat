var usersController = require('./../components/users/usersController');
var routesController = require('./../components/routes/routesController');
var passport = require('./passport');

module.exports = function (app, express) {
  app.get('/api/keepalive', function(req, res){
    res.status(200).json({message: "all ok from the server"});
  });

  app.get('/api/users', usersController.getUsers);
  app.get('/api/users/:id', usersController.getUser);
  app.get('/api/inserTestData', usersController.insertTestData);

  app.get('/api/userInterestedInDriverRoute', routesController.userInterestedInDriverRoute);
  app.get('/api/driverConfirmsPassenger', routesController.driverConfirmsPassenger);


  app.post('/api/passengerRoute', routesController.insertPassengerRoute);
  app.get('/api/passengerRoute', routesController.getPassengerRoutes);

  app.post('/api/driverRoute', routesController.insertDriverRoute);
  app.get('/api/driverRoute', routesController.getDriverRoutes);

  app.get('/api/loggedin', function(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
  });

  app.get('/api/auth/facebook',
    passport.authenticate('facebook', { scope: ['public_profile'] }),
    function(req, res){});

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