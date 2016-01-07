var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  facebookId: {
    type: String,
    unique: true
  },
  name: String,
  email: String,
  picture: String,
  phoneNumber: String,
  IsDriver: Boolean,
  PassengerRoutes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PassengerRoutes' }],
  DriverRoutes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DriverRoutes' }]
});

module.exports = mongoose.model('users', UserSchema);