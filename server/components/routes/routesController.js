var Q = require('q');
var PassengerRoutes = require('./passengerRoutesModel');
var DriverRoutes = require('./driverRoutesModel');
var User = require('./../users/usersModel');

var findAllPassengerRoutes = Q.nbind(PassengerRoutes.find, PassengerRoutes);
var findPassengerRoutes = Q.nbind(PassengerRoutes.findOne, PassengerRoutes);
var createPassengerRoutes = Q.nbind(PassengerRoutes.create, PassengerRoutes);

var findAllDriverRoutes = Q.nbind(DriverRoutes.find, DriverRoutes);
var findDriverRoutes = Q.nbind(DriverRoutes.findOne, DriverRoutes);
var createDriverRoutes = Q.nbind(DriverRoutes.create, DriverRoutes);

var findUser = Q.nbind(User.findOne, User);

module.exports = {

  insertPassengerRoute: function(req, res, next){
    var passengerRoute = req.body.passengerRoute;
    var userId = req.body.userId;

    findUser({ _id: userId })
      .then(function(user){
        if(user.IsDriver){
          res.sendStatus(400);
        }

        createPassengerRoutes({
          start: passengerRoute.start,
          end: passengerRoute.end,
          days: passengerRoute.days,
          fromHour: passengerRoute.fromHour,
          fromMinutes: passengerRoute.fromMinutes,
          toHour: passengerRoute.toHour,
          toMinutes: passengerRoute.toMinutes
        })
        .then(function(newRoute){
          user.PassengerRoutes.push(newRoute);
          user.save();
          res.status(200).json(newRoute);
        });
      });
  },

  getPassengerRoutes: function(req, res, next) {
    findAllPassengerRoutes()
      .then(function(routes) {
        res.status(200).json(routes);
      })
      .fail(function(error) {
        next(error);
      });
  },

  insertDriverRoute: function(req, res, next){
    var driverRoute = req.body.driverRoute;
    var userId = req.body.userId;

    findUser({ _id: userId })
      .then(function(user){
        if(!user.IsDriver){
          res.sendStatus(400);
        }

        createDriverRoutes({
          start: driverRoute.start,
          end: driverRoute.end,
          days: driverRoute.days,
          fromHour: driverRoute.fromHour,
          fromMinutes: driverRoute.fromMinutes,
          toHour: driverRoute.toHour,
          toMinutes: driverRoute.toMinutes
        })
        .then(function(newRoute){
          user.DriverRoutes.push(newRoute);
          user.save();
          res.status(200).json(newRoute);
        });
      });
  },

  getDriverRoutes: function(req, res, next) {
    findAllDriverRoutes()
      .then(function(routes) {
        res.status(200).json(routes);
      })
      .fail(function(error) {
        next(error);
      });
  }
};

