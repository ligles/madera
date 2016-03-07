var bodyParser = require('body-parser');
var express = require('express');
var config = require('./config');
var app     = express();
var port    = config.api.port;



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./router/index.js')(app);
//var test = require('./base/test.js')(app);


// Start the app
app.listen(port);