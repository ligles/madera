/*************************************************************************
 *                             REQUIREMENTS                              *
 ************************************************************************/

var express = require('express'),
    router = express.Router(),
    config = require ('../../config'),
    base = require('../../base/connection');
// TODO : Remplacer par les requêtes en base de données
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
var projects = [
    {
        "id":"000003001",
        "project_name":"Abris de jardin",
        "date":"14/09/2015",
        "client":"000003",
        "status":"EN COURS"
    },
    {
        "id":"000003002",
        "project_name":"Chalet en Suisse",
        "date":"17/12/2015",
        "client":"000003",
        "status":"VALIDATION"
    }
];

/************************************************************************
 *                                ROUTES                                *
 ************************************************************************/

// Default route. Return all the clients
router.get('/', function(req, res) {
    res.status(200);
    res.header("Access-Control-Allow-Origin", "*");
    res.send(clients);
});

// Get by ID
router.get('/:id', function(req, res) {

    if(req.params.id == null)
    {
        res.status(400);
        res.header("Access-Control-Allow-Origin", "*");
        res.send(msg400);
    }
    else
    {
        var result = clients.filter(function(item) {
            return item.id == req.params.id
        })[0];
        result.projects_list = projects.filter(function(item) {
            if(item.client == result.id) return true;
            return false;
        });

        if(result == 0) {
            res.status(204);
            res.header("Access-Control-Allow-Origin", "*");
            res.send(msg204);
        }
        else {
            res.status(200);
            res.header("Access-Control-Allow-Origin", "*");
            res.send(result);
        }
    }
});

// Search client by text / ref
router.get('/search/:text', function(req, res) {
    console.log("enter");
    if(req.params.text == null)
    {
        console.log("null");

        res.status(400);
        res.header("Access-Control-Allow-Origin", "*");
        res.send(msg400);
    }
    else
    {
        //var text = req.params.text.toUpperCase();
        res.status(200);
        res.header("Access-Control-Allow-Origin", "*");
        base.query('getClient',req,res);

    }
});
// Add client
router.post('/', function(req, res) {


    if(req.body.first_name == null
        || req.body.last_name == null
        || req.body.birth_date == null)
    {
        res.status(400);
        res.header("Access-Control-Allow-Origin", "*");
        res.send(msg400);
    }
    else
    {

        res.status(200);
        res.header("Access-Control-Allow-Origin", "*");
        base.query('upsertClient',req,res);


    }
});

// Update client
router.post('/update/', function(req, res) {

    if(req.body.id == null
        || req.body.first_name == null
        || req.body.last_name == null
        || req.body.birth_date == null)
    {
        res.status(400);
        res.header("Access-Control-Allow-Origin", "*");
        res.send('400');
    }
    else
    {
        res.status(200);
        res.header("Access-Control-Allow-Origin", "*");
        base.query('upsertClient',req,res);


        res.status(204);
        res.header("Access-Control-Allow-Origin", "*");
        res.send('204');
    }
});


module.exports = router;


/*************************************************************************
 *                               FUNCTIONS                               *
 ************************************************************************/
