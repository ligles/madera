var bodyParser = require('body-parser')
var express = require('express');
var app     = express();

var port    = process.env.PORT || 3000;

// Default route. Return nothing
app.get('/', function(req, res) {
    res.type('text/plain');     // Set content-type
    res.send('Hello world !');  // Send text response
});

app.use('/clients', require('./router/routes/clients'));
app.use('/commandes', require('./router/routes/commandes'));
app.use('/devis', require('./router/routes/devis'));
app.use('/projets', require('./router/routes/projets'));

// ERRORS

// Handle 404
app.use(function (error, req) {
    req.status(404);
    req.render('public/404.html');
});

// Handle 500
app.use(function (error, req, res, next) {
    res.status(500);
    res.render('public/500.html');
});

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


// Start the app
app.listen(port);