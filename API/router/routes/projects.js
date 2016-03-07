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
        res.send('400');
    }
    else
    {
        var result = projects.filter(function(item) {
            return item.id == req.params.id
        })[0];
        result.quotations_list = devis.filter(function(item) {
            if(item.project_name == result.project_name) return true;
            return false;
        });

        if(result == 0) {
            res.status(204);
            res.header("Access-Control-Allow-Origin", "*");
            res.send('204');
        }
        else {
            res.status(200);
            res.header("Access-Control-Allow-Origin", "*");
            res.send(result);
        }
    }
});

// Search project by text / ref
router.get('/search/:text', function(req, res) {
    if(req.params.text == null)
    {
        res.status(400);
        res.header("Access-Control-Allow-Origin", "*");
        res.send('400');
    }
    else
    {
        var text = req.params.text.toUpperCase();

        var result = projects.filter(function(item) {
            if (item.id.toUpperCase().search(text) != -1) return true;
            if (item.project_name.toUpperCase().search(text) != -1) return true;
            return false;
        });

        if(result == 0) {
            res.status(204);
            res.header("Access-Control-Allow-Origin", "*");
            res.send('204');
        }
        else {
            res.status(200);
            res.header("Access-Control-Allow-Origin", "*");
            res.send(result);
        }
    }
});

// Add project
router.post('/', function(req, res) {

    if(req.body.project_name == null
        || req.body.date == null
        || req.body.client == null
        || req.body.status == null)
    {
        res.status(400);
        res.header("Access-Control-Allow-Origin", "*");
        res.send('400');
    }
    else
    {
        var numberProjectForClient = 1;

        projects.forEach(function(item) {
            if(item.client == req.body.client) numberProjectForClient++;
        });

        projects.push({
            id: req.body.client + numberProjectForClient,
            project_name: req.body.project_name,
            date: req.body.date,
            client: req.body.client,
            status: req.body.status
        });

        res.status(200);
        res.header("Access-Control-Allow-Origin", "*");
        res.send('200');
    }
});

// Update project
router.post('/update/', function(req, res) {

    if(req.body.id == null
        || req.body.name == null
        || req.body.status == null)
    {
        res.status(400);
        res.header("Access-Control-Allow-Origin", "*");
        res.send('400');
    }
    else
    {
        for(var count = 0; count < projects.length; count++) {
            if(projects[count].id == req.body.id) {

                projects[count].project_name = req.body.name;
                projects[count].status = req.body.status;

                res.status(200);
                res.header("Access-Control-Allow-Origin", "*");
                res.send('200');

                return;
            }
        }

        res.status(204);
        res.header("Access-Control-Allow-Origin", "*");
        res.send('204');
    }
});

module.exports = router;


/*************************************************************************
 *                               FUNCTIONS                               *
 ************************************************************************/
