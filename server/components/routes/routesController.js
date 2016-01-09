var Q = require('q');
var PassengerRoutes = require('./passengerRoutesModel');
var DriverRoutes = require('./driverRoutesModel');
var User = require('./../users/usersModel');
var distanceCalculator = require('../../../algorithm/utility');

var findAllPassengerRoutes = Q.nbind(PassengerRoutes.find, PassengerRoutes);
var findPassengerRoutes = Q.nbind(PassengerRoutes.findOne, PassengerRoutes);
var createPassengerRoutes = Q.nbind(PassengerRoutes.create, PassengerRoutes);
var updatePassengerRoutes = Q.nbind(PassengerRoutes.update, PassengerRoutes);

var findAllDriverRoutes = Q.nbind(DriverRoutes.find, DriverRoutes);
var findDriverRoutes = Q.nbind(DriverRoutes.findOne, DriverRoutes);
var createDriverRoutes = Q.nbind(DriverRoutes.create, DriverRoutes);
var updateDriverRoutes = Q.nbind(DriverRoutes.update, DriverRoutes);

var findUser = Q.nbind(User.findOne, User);

module.exports = {

  userInterestedInDriverRoute: function(req, res, next){
    var passengerRouteId = req.body.passengerRouteId;
    var driverRouteId = req.body.driverRouteId;

    findDriverRoutes({ _id: driverRouteId })
      .then(function(driverRoute){

        findPassengerRoutes({ _id: passengerRouteId })
          .then(function(passengerRoute){
            passengerRoute.driverRoutesIAmInterestedIn.push(driverRoute);
            driverRoute.prospectivePassengerRoutes(passengerRoute);
            passengerRoute.save();
            driverRoute.save();
            res.sendStatus(200);
          });

      })
      .fail(function(error) {
        next(error);
      });
  },

  driverConfirmsPassenger: function(req, res, next){
    var passengerRouteId = req.body.passengerRouteId;
    var driverRouteId = req.body.driverRouteId;

    findDriverRoutes({ _id: driverRouteId })
      .then(function(driverRoute){

        findPassengerRoutes({ _id: passengerRouteId })
          .then(function(passengerRoute){
            driverRoute.confirmedPassengerRoutes.push(passengerRoute);
            passengerRoute.confirmedDriverRoute = driverRoute;
            passengerRoute.save();
            driverRoute.save();

            updatePassengerRoutes({ _id: passengerRouteId },
              { $pull: { driverRoutesIAmInterestedIn: { _id: driverRouteId } } }
            );

            updateDriverRoutes({ _id: driverRouteId },
              { $pull: { prospectivePassengerRoutes: { _id: passengerRouteId } } }
            );

            res.sendStatus(200);
          });

      })
      .fail(function(error) {
        next(error);
      });
  },

  bestDriverRoutesForPassengerRouteId: function(req, res, next){
    var passengerRouteId = req.params.id;
    var results = {};

    findPassengerRoutes({ _id: passengerRouteId })
      .then(function(passengerRoute){
        findAllDriverRoutes({})
          .then(function(driverRoutes){
            
            for(var i=0; i<driverRoutes.length; i++){
              var driverRoute = driverRoutes[i];
              var distance = distanceCalculator([passengerRoute.start, passengerRoute.end],
                [driverRoute.start, driverRoute.end],
                [[passengerRoute.fromHour, passengerRoute.fromMinutes],[passengerRoute.toHour, passengerRoute.toMinutes]],
                [[driverRoute.fromHour, driverRoute.fromMinutes],[driverRoute.toHour, driverRoute.toMinutes]],
                passengerRoute.days, driverRoute.days);
              if (distance){
                results[driverRoute._id] = { driverRoute: driverRoute, distance: distance };
              }
            }

            res.status(200).json(results);
          });
      })
      .fail(function(error) {
        next(error);
      });
  },

  insertPassengerRoute: function(req, res, next){
    var passengerRoute = req.body.passengerRoute;
    var userId = req.body.userId;

    findUser({ _id: userId })
      .then(function(user){
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
          user.IsDriver = false;
          user.save();
          res.status(200).json(newRoute);
        });
      })
      .fail(function(error) {
        next(error);
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
        createDriverRoutes({
          start: driverRoute.start,
          end: driverRoute.end,
          days: driverRoute.days,
          fromHour: driverRoute.fromHour,
          fromMinutes: driverRoute.fromMinutes,
          toHour: driverRoute.toHour,
          toMinutes: driverRoute.toMinutes,
          seats: driverRoute.seats,
          fee: driverRoute.fee
        })
        .then(function(newRoute){
          user.IsDriver = true;
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

