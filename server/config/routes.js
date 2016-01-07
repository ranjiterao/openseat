var usersController = require('./../components/users/usersController');
var routesController = require('./../components/routes/routesController');

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
};