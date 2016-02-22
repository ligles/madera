/*************************************************************************
 *                             REQUIREMENTS                              *
 ************************************************************************/

var express = require('express'),
    router = express.Router();

// TODO : Remplacer par les requêtes en base de données
var orders = [
    {
        id_order:"0000000001",
        client_id:"000001",
        date_of_issue:"22/02/2016",
        date_of_dispatch:null,
        date_of_reception:null,
        status_order:"TRT"
    },
    {
        id_order:"0000000002",
        client_id:"000003",
        date_of_issue:"23/03/2016",
        date_of_dispatch:null,
        date_of_reception:null,
        status_order:"NEW"
    }
];

var msg200 = JSON.stringify("Query done."),
    msg204 = JSON.stringify("No results."),
    msg400 = JSON.stringify("Missing parameters.");

/************************************************************************
 *                                ROUTES                                *
 ************************************************************************/

// Default route. Return all orders
router.get('/', function(req, res) {
    res.status(200);
    res.header("Access-Control-Allow-Origin", "*");
    res.send(orders);
});

// Search order by text / ref
router.get('/search/:text', function(req, res) {
    if(req.params.text == null)
    {
        res.status(400);
        res.header("Access-Control-Allow-Origin", "*");
        res.send(msg400);
    }
    else{
        var text = req.params.text.toUpperCase();

        var result = orders.filter(function(item) {
            if (item.id_order.toUpperCase().search(text) != -1) return true;
            if (item.client_id.toUpperCase().search(text) != -1) return true;
            //Filter the result with orders in new or treatment state
            if (item.status_order == "TRT" || item.status_order == "NEW") return true;
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
            if(item.id_order == result.id_order) return true;
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

// Add order
router.post('/', function(req, res) {

    if(req.body.id_order == null
        || req.body.client == null
        || req.body.date_of_issue == null
        || req.body.status_order == null )
    {
        res.status(400);
        res.header("Access-Control-Allow-Origin", "*");
        res.send(msg400);
    }
    else
    {
        var newId = orders.length + 1;
        var newOrderId = "0000000000" + newId ;
        orders.push({
            //recover the new id
            id: newOrderId.slice(newOrderId.length-10 ,10),
            client_id:"000003",
            date_of_issue:Date.now(),
            date_of_dispatch:null,
            date_of_reception:null,
            status_order:"NEW"
        });

        res.status(200);
        res.header("Access-Control-Allow-Origin", "*");
        res.send(msg200);
    }
});

//Update order
router.post('/update/', function(req, res) {

    if(req.body.id_order == null
        || req.body.client == null
        || req.body.date_of_issue == null
        || req.body.status_order == null )
    {
        res.status(400);
        res.header("Access-Control-Allow-Origin", "*");
        res.send(msg400);
    }
    else
    {
        for(var count = 0; count < orders.length; count++) {
            if(orders[count].id == req.body.id) {

                orders[count].id_order = req.body.id_order;
                orders[count].client_id = req.body.client_id;
                orders[count].date_of_issue = req.body.date_of_issue;
                orders[count].date_of_dispatch = req.body.date_of_dispatch;
                orders[count].date_of_reception = req.body.date_of_reception;
                orders[count].status_order = req.body.status_order;

                res.status(200);
                res.header("Access-Control-Allow-Origin", "*");
                res.send(msg200);

                return;
            }
        }

        res.status(204);
        res.header("Access-Control-Allow-Origin", "*");
        res.send(msg204);
    }
});

module.exports = router;

/*************************************************************************
 *                               FUNCTIONS                               *
 ************************************************************************/
