var expect = require('chai').expect;
var mongoose = require('mongoose');
var DriverRoute = require('../server/components/routes/driverRoutesModel.js');

describe('DriverRoute Model', function () {

  it('DriverRoute should be a Mongoose model', function () {
    expect(new DriverRoute()).to.be.instanceOf(mongoose.Model);
  });

  it('should have a schema', function () {
    expect(DriverRoute.schema).to.exist;
  });

});