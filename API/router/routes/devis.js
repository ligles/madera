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
    res.send('Hello world from devis/ !');  // Send text response
});

// Get by ID
router.get('/:id', function(req, res) {
    if(req.params.id == null)
    {
        res.status(404);
        res.render('public/404.html');
    }
    else{

        //Tester si l'id est d�j� enregistr� en base
        //retourn� page 404 si non trouv�
    }
});

// Add devis
router.post('/', function(req, res) {

});

// Update devis
//PUT Method for update entire class data else PATCH command
router.put('/:id', function(req, res) {

    if(req.params.id == null)
    {
        res.status(404);
        res.render('public/404.html');
    }
    else{
        //Tester si l'id est d�j� enregistr� en base
        //retourn� page 404 si non trouv�

    }
});

module.exports = router;


/*************************************************************************
 *                               FUNCTIONS                               *
 ************************************************************************/
