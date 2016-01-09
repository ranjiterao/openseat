var expect = require('chai').expect;
var mongoose = require('mongoose');
var PassengerRoute = require('../server/components/routes/passengerRoutesModel.js');

describe('PassengerRoute Model', function () {

  it('PassengerRoute should be a Mongoose model', function () {
    expect(new PassengerRoute()).to.be.instanceOf(mongoose.Model);
  });

  it('should have a schema', function () {
    expect(PassengerRoute.schema).to.exist;
  });

});