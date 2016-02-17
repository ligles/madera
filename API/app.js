var bodyParser = require('body-parser')
var express = require('express');
var app     = express();

var port    = process.env.PORT || 3000;

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./router/index.js')(app);


// Start the app
app.listen(port);