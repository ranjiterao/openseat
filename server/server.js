var express = require('express');
var mongoose = require('mongoose');
var constants = require('./../constants');

var app = express();

mongoose.connect(constants.MONGOLAB_URI);
require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

app.listen(process.env.PORT || 8000, function(){
  console.log('app listening on port', process.env.PORT || 8000);
});

module.exports = app;