var mongoose = require('mongoose');

var DriverRoutesSchema = new mongoose.Schema({
  start: String,
  end: String,
  days: [{
    type: Boolean,
    default: [false, false, false, false, false, false, false]
  }],
  hour: {min: 0, max: 24, type: Number},
  minutes: {min: 0, max: 60, type: Number},
  seats: Number,
  fee: Number,
  prospectivePassengers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
  confirmedPassengers: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'}
});

module.exports = mongoose.model('driverRoutes', DriverRoutesSchema);