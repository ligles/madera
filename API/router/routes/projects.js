/*************************************************************************
 *                             REQUIREMENTS                              *
 ************************************************************************/

var express = require('express'),
    router = express.Router();

// TODO : Remplacer par les requêtes en base de données
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

// Default route. Return all the projects
router.get('/', function(req, res) {
    res.status(200);
    res.header("Access-Control-Allow-Origin", "*");
    res.send(projects);
});

// Get by ID
router.get('/:id', function(req, res) {
    if(req.params.id == null)
    {
        res.status(400);
        res.header("Access-Control-Allow-Origin", "*");
        res.render('public/404.html');
    }
    else
    {
        var result = projects.filter(function(item) {
            return item.id == req.params.id
        });

        if(result == 0) {
            res.status(204);
            res.header("Access-Control-Allow-Origin", "*");
            res.send();
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
    if(req.params.text == null)
    {
        res.status(400);
        res.header("Access-Control-Allow-Origin", "*");
        res.render('public/404.html');
    }
    else{
        var text = req.params.text.toUpperCase();

        var result = clients.filter(function(item) {
            if (item.id.toUpperCase().search(text) != -1) return true;
            if (item.first_name.toUpperCase().search(text) != -1) return true;
            if (item.last_name.toUpperCase().search(text) != -1) return true;
            return false;
        });

        if(result == 0) {
            res.status(204);
            res.header("Access-Control-Allow-Origin", "*");
            res.send();
        }
        else {
            res.status(200);
            res.header("Access-Control-Allow-Origin", "*");
            res.send(result);
        }
    }
});

// Add client
router.post('/add/', function(req, res) {

});

// Update client
router.post('/update/', function(req, res) {

    if(req.params.id == null)
    {
        res.status(404);
        res.header("Access-Control-Allow-Origin", "*");
        res.render('public/404.html');
    }
    else
    {
    }
});

module.exports = router;


/*************************************************************************
 *                               FUNCTIONS                               *
 ************************************************************************/
