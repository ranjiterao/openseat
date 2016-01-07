var mongoose = require('mongoose');

var PassengerRoutesSchema = new mongoose.Schema({
  start: String,
  end: String,
  days: [{
    type: Boolean,
    default: [false, false, false, false, false, false, false]
  }],
  hour: {min: 0, max: 24, type: Number},
  minutes: {min: 0, max: 60, type: Number},
  driverRoutesIAmInterestedIn: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DriverRoutes' }],
  confirmedDriverRoute: {type: mongoose.Schema.Types.ObjectId, ref: 'DriverRoutes'}
});

module.exports = mongoose.model('passengerRoutes', PassengerRoutesSchema);