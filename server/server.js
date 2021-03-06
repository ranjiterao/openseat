var express = require('express');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/openseat');
require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

app.listen(process.env.PORT || 8000, function(){
  console.log('app listening on port', process.env.PORT || 8000);
});

module.exports = app;