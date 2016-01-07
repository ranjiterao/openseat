var usersController = require('./../components/users/usersController');

module.exports = function (app, express) {
  app.get('/api/users', usersController.getUsers);
  app.get('/api/inserTestData', usersController.insertTestData);

  app.get('/api/keepalive', function(req, res){
    res.status(200).json({message: "all ok from the server"});
  });
};