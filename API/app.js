var bodyParser = require('body-parser')
var express = require('express');
var app     = express();

var port    = process.env.PORT || 3000;

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Default route. Return 400
app.get('/', function(req, res) {
    res.status(400);
    res.header("Access-Control-Allow-Origin", "*");
    res.sendFile(__dirname + '/public/index.html');
});

// Other routes
app.use('/clients', require('./router/routes/clients'));
app.use('/orders', require('./router/routes/orders'));
app.use('/quotations', require('./router/routes/quotations'));
app.use('/projects', require('./router/routes/projects'));


// ERRORS

// Handle 404
app.use(function (error, req) {
    req.status(404);
    req.sendFile(__dirname + '/public/404.html');
});

// Handle 500
app.use(function (error, req, res, next) {
    res.status(500);
    res.sendFile(__dirname + '/public/500.html');
});


// Start the app
app.listen(port);



// HELP

// Status codes :
// 200 : OK
// 204 : No content
// 400 : Bad request
// 404 : Not found
// 500 : Internal server error
// https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP

// RETURNS
// res.statusCode = 404;  / res.status(200); // Status code
// res.send('Error 404: No quote found');   // Envoyer un texte
// res.json(q);                     // Envoyer du JSON

// GET
// app.get('/link/:param&:param2')  // Récupérer des paramètres
// req.params.id                    // Récupérer un paramètre

// POST
// app.post('/link')
// req.body.hasOwnProperty('text')  // Test si la variable est post
// requ.body.text                   // Récupérer le contenu de la variable post

// CRUD
//  /api/bears	        GET	Get all the bears.
//  /api/bears	        POST	Create a bear.
//  /api/bears/:bear_id	GET	Get a single bear.
//  /api/bears/:bear_id	PUT	Update a bear with new info.
//  /api/bears/:bear_id	DELETE	Delete a bear.
