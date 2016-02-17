/*************************************************************************
 *                             REQUIREMENTS                              *
 ************************************************************************/

var express = require('express'),
    router = express.Router();

// TODO : Remplacer par les requêtes en base de données
var orders = [
    {
        id_order:"000001",
        id_client:"000001"
    },
    {
        id_order:"000002",
        id_client:"000002"
    }
];

var msg200 = JSON.stringify("Query done."),
    msg204 = JSON.stringify("No results."),
    msg400 = JSON.stringify("Missing parameters.");

/************************************************************************
 *                                ROUTES                                *
 ************************************************************************/

// Default route. Return all the orders
router.get('/', function(req, res) {
    res.status(200);
    res.header("Access-Control-Allow-Origin", "*");
    res.send(orders);
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
        var result = orders.filter(function(item) {
            return item.id == req.params.id
        })[0];
        result.orders_list = orders.filter(function(item) {
            if(item.id_client == result.id_client) return true;
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

//todo ADD

//todo UPDATE

//todo Search orders by text / ref

module.exports = router;

/*************************************************************************
 *                               FUNCTIONS                               *
 ************************************************************************/
