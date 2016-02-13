/*************************************************************************
 *                             REQUIREMENTS                              *
 ************************************************************************/

var express = require('express'),
    router = express.Router();

/************************************************************************
 *                                ROUTES                                *
 ************************************************************************/

// Default route. Return nothing
router.get('/', function(req, res) {
    res.type('text/plain');     // Set content-type
    res.send('Hello world from commandes/ !');  // Send text response
});

// Get by ID
router.get('/:id', function(req, res) {
    if(req.params.id == null)
    {
        res.status(404);
        res.render('public/404.html');
    }
    else{

    }
});

// Add commande
router.post('/', function(req, res) {

});

// Update commande
//PUT Method for update entire class data else PATCH command
//200 (OK) or 204 (No Content). 404 (Not Found), if ID not found or invalid.
router.put('/:id', function(req, res) {

    if(req.params.id == null)
    {
        res.status(404);
        res.render('public/404.html');
    }
    else{

    }
});

module.exports = router;


/*************************************************************************
 *                               FUNCTIONS                               *
 ************************************************************************/
