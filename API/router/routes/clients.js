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

    var clients = [
        {
            id:"000001",
            first_name:"Anthony",
            last_name:"Gée",
            address_1:"65 rue Maréchal de Lattre de Tassigny",
            address_2:"V-10",
            city:"Mont-Saint-Aignan",
            zip_code:"76130",
            country:"France",
            phone:"0609040820",
            mail:"anthony.gee@viacesi.fr",
            birth_date:"06/02/1994"
        },
        {
            id:"000002",
            first_name:"Anaïs",
            last_name:"Verdier",
            address_1:"4 rue Parmentier",
            address_2:"",
            city:"Le Havre",
            zip_code:"76600",
            country:"France",
            phone:"0607080910",
            mail:"anais.verdier@viacesi.fr",
            birth_date:"07/06/1990"
        },
        {
            id:"000003",
            first_name:"Gilles",
            last_name:"Vandecandelaere",
            address_1:"8 impasse de l'écureuil",
            address_2:"Entrée n°2",
            city:"Rouen",
            zip_code:"76000",
            country:"France",
            phone:"06099889988",
            mail:"gilles.vandecandelaere@viacesi.fr",
            birth_date:"01/01/1970"
        }
    ];

    res.statusCode = 200;
    res.header("Access-Control-Allow-Origin", "*");
    res.send(clients);
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

// Add client
router.post('/', function(req, res) {

});

// Update client
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
