/*************************************************************************
 *                             REQUIREMENTS                              *
 ************************************************************************/

var express = require('express'),
    router = express.Router();

// TODO : Remplacer par les requêtes en base de données
var devis = [
    {
        "id":"00000300101",
        "date":"17/12/2015",
        "project_name":"Abris de jardin",
        "client":"G. Vandecandelaere",
        "status":"ANNULÉ",
        "amounts":[
            "30000",
            "30000",
            "39500",
            "100500"
        ]
    },
    {
        "id":"00000300102",
        "date":"18/12/2015",
        "project_name":"Abris de jardin",
        "client":"G. Vandecandelaere",
        "status":"EN COURS",
        "amounts":[
            "20000",
            "20000",
            "10000",
            "150000"
        ]
    }
];

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

        //Tester si l'id est déjà enregistré en base
        //retourné page 404 si non trouvé
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
        //Tester si l'id est déjà enregistré en base
        //retourné page 404 si non trouvé

    }
});

module.exports = router;


/*************************************************************************
 *                               FUNCTIONS                               *
 ************************************************************************/
