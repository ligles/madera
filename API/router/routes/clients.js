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
    res.send('Hello world from clients/ !');  // Send text response
});

// Get by ID
router.get('/:id', function(req, res) {

});

// Add client
router.post('/', function(req, res) {

});


module.exports = router;


/*************************************************************************
 *                               FUNCTIONS                               *
 ************************************************************************/
