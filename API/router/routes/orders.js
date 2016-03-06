/*************************************************************************
 *                             REQUIREMENTS                              *
 ************************************************************************/

var express = require('express'),
    router = express.Router();

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

var orders = [
    {
        id_order:"0000000001",
        client_id:"000001",
        client_first_name:"",
        date_of_issue:"22/02/2016",
        date_of_dispatch:null,
        date_of_reception:null,
        status_order:"TRAITEMENT"
    },
    {
        id_order:"0000000002",
        client_id:"000003",
        client_first_name:"",
        date_of_issue:"23/03/2016",
        date_of_dispatch:null,
        date_of_reception:null,
        status_order:"EN ATTENTE"
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
            //Filter the result with orders in uncompleted state
            if (item.status_order == "VALIDATION" ||
                item.status_order == "ATTENTE" ||
                item.status_order == "EN COURS")
                return true;
            return false;
        });

        if(result == 0) {
            res.status(204);
            res.header("Access-Control-Allow-Origin", "*");
            res.send(msg204);
        }
        else {
            for(var i =0; i< result.length; i++)
            {
                for(var j =0; j< clients.length; j++)
                {
                    if(result[i].client_id == clients[j].id)
                    {
                        result[i].client_first_name = clients[j].first_name;
                        break;
                    }
                }
            }

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
        || req.body.client_id == null
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

        var date = new Date();
        var day = date.getDate().toString();
        if(day.length < 2) day = "0" + day;
        var month = (date.getMonth() + 1).toString();
        if(month.length < 2) month = "0" + month;

        orders.push({
            //recover the new id
            id: newOrderId.slice(newOrderId.length-10 ,10),
            client_id:"000003",
            client_first_name:"",
            date_of_issue:day + "/" + month + "/" + date.getFullYear(),
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
        || req.body.client_id == null
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
