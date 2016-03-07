var express = require('express'),
    router = express.Router(),
    base = require('../../base/connection');



 // init db
 router.get('/', function(req, res) {

    /* router.get('/init', function(req, res) {
         var cassandra = require('cassandra-driver');
         var async = require('async');
         var client = new cassandra.Client({contactPoints: ['82.235.3.251']});

         client.execute("CREATE KEYSPACE IF NOT EXISTS madera WITH replication " +
             "= {'class' : 'SimpleStrategy', 'replication_factor' : 3};",
             afterExecution('Error: ', 'Keyspace created.', res));

         function afterExecution(errorMsessage, successMessage, res) {
             return function(err) {
                 if (err) {
                     return res.json(errorMessage);
                 } else {
                     res.json(successMessage);
                 }
             }
         }

     });*/

 });

// init db
router.get('/init', function(req, res) {

    base.init(res);



});

// drop db
router.get('/drop', function(req, res) {

    base.drop(res);

});


module.exports = router;