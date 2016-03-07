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

// Default route. Return all the quotations
router.get('/', function(req, res) {
    res.status(200);
    res.header("Access-Control-Allow-Origin", "*");
    res.send(devis);
});

// Get by ID
router.get('/:id', function(req, res) {

    if(req.params.id == null)
    {
        res.status(400);
        res.header("Access-Control-Allow-Origin", "*");
        res.search(400);
    }
    else
    {
        var result = devis.filter(function(item) {
            return item.id == req.params.id
        })[0];

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

// Search quotation by text / ref
router.get('/search/:text', function(req, res) {
    if(req.params.text == null)
    {
        res.status(400);
        res.header("Access-Control-Allow-Origin", "*");
        res.search(400);
    }
    else
    {
        var text = req.params.text.toUpperCase();

        var result = devis.filter(function(item) {
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

// Add quotation
router.post('/', function(req, res) {

    if(req.body.project_id == null
        || req.body.date == null
        || req.body.status == null
        || req.body.amount_1 == null
        || req.body.amount_2 == null
        || req.body.amount_3 == null
        || req.body.amount_4 == null)
    {
        res.status(400);
        res.header("Access-Control-Allow-Origin", "*");
        res.send('400');
    }
    else
    {
        var numberOfQuotationsForClient = 1;

        for(var count = 0; count < devis.length; count++) {
            if(devis[count].client == req.body.client) numberOfQuotationsForClient++;
        }

        devis.push({
            "id": req.body.project_id + "" + numberOfQuotationsForClient,
            "date": req.body.date,
            "project_name": "A récupérer en DB",
            "client": "A récupérer en DB",
            "status": req.body.status,
            "amounts":[
                req.body.amount_1,
                req.body.amount_2,
                req.body.amount_3,
                req.body.amount_4
            ]
        });

        res.status(200);
        res.header("Access-Control-Allow-Origin", "*");
        res.send('200');
    }
});

// Update quotation
router.post('/update/', function(req, res) {

    if(req.body.id == null
        || req.body.status == null
        || req.body.amount_1 == null
        || req.body.amount_2 == null
        || req.body.amount_3 == null
        || req.body.amount_4 == null)
    {
        res.status(400);
        res.header("Access-Control-Allow-Origin", "*");
        res.search(400);
    }
    else
    {
        for(var count = 0; count < devis.length; count++) {
            if(devis[count].id == req.body.id) {

                devis[count].status = req.body.status;
                devis[count].amounts = [
                    req.body.amount_1.toString(),
                    req.body.amount_2.toString(),
                    req.body.amount_3.toString(),
                    req.body.amount_4.toString()
                ];

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
