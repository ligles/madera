/**
 * Created by ligles on 07/03/16.
 */
var config = require('../config');
var cassandra = require('cassandra-driver');
var async = require('async');

module.exports = {

    query: function (query,req,res) {


        var client = new cassandra.Client({contactPoints: [config.bdd.host], keyspace:config.bdd.keyspace });
        var data = "foo";
        switch(query) {
            case 'upsertClient':


                var upsertClient = 'INSERT INTO '+config.bdd.keyspace+'.clients (id, first_name, last_name, address_1,address_2,city,zip_code,country,phone, mail, birth_date)  '
                    + 'VALUES(?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?);';
                var id = null;
                if ( ! req.body.hasOwnProperty('id')) {
                    id = cassandra.types.uuid();
                } else {
                    id = req.body.id;
                }

                client.execute(upsertClient,
                    [id, req.body.first_name, req.body.last_name, null, null, null,null, null, null,null,req.body.birth_date],
                    afterExecution('Error: ', 'Client ' + req.body.first_name +' '+ req.body.last_name + ' inseré. id = '+ id, res));

                break;


            case 'deleteClient':
                console.log('deleteclient');
                break;


            case 'getClient':
                /*console.log('getClient');
                  client.execute("SELECT id, first_name, last_name, birth_date FROM "+config.bdd.keyspace+".clients WHERE last_name = '"+req.params.text+"'; ", function (err, result) {
                  if (!err){

                        if ( result.rows.length > 0 ) {
                            data = result.rows[0];
                            var user = result.rows[0];
                           // return user;
                            console.log("id =  %s, name = %s, date = %d", user.id,user.first_name, user.birth_date);
                            return  "hello";
                        } else {
                            console.log("No results");
                            //return 0;
                        }
                    }else{
                        console.log(err);
                    }


                    // Run next function in series
                   // callback(err, null);

                 });*/



                client.execute("SELECT id, first_name, last_name, birth_date FROM "+config.bdd.keyspace+".clients WHERE last_name = '"+req.params.text+"'; ", function (err, result) {
                    if (err) {
                        res.status(404).send({ msg : 'client not found.' });
                    } else {
                        
                        res.send(result.rows);
                    }
                });






                break;
            default:
                console.log('default');
                break;
        }
        //console.log("id data =  %s, name = %s, date = %d", data.id,data.first_name, data.birth_date)
        console.log(data);

    },
    init: function(res){


        var client = new cassandra.Client({contactPoints: [config.bdd.host]});
        client.execute("CREATE KEYSPACE IF NOT EXISTS " + config.bdd.keyspace + " WITH replication " +
            "= {'class' : 'SimpleStrategy', 'replication_factor' : 3};",

            function (err) {
                    if ( err) {
                        afterExecution('Error: ', 'Keyspace created.', res);
                    } else {
                        console.log("Keyspace created");
                        async.parallel([
                            function(next) {
                                client.execute('CREATE TABLE IF NOT EXISTS '+ config.bdd.keyspace+'.clients (' +
                                    'id uuid,' +
                                    'first_name varchar,' +
                                    'last_name varchar,' +
                                    'address_1 varchar,' +
                                    'address_2 varchar,' +
                                    'city varchar,' +
                                    'zip_code varchar,' +
                                    'country varchar,' +
                                    'phone int,' +
                                    'mail varchar,' +
                                    'birth_date varchar,' +
                                    'PRIMARY KEY (last_name, first_name, id,  birth_date)' +
                                    ');',
                                    next);
                            } ,
                             function(next) {
                             client.execute('CREATE TABLE IF NOT EXISTS '+ config.bdd.keyspace+'.projects (' +
                             'id uuid PRIMARY KEY,' +
                             'project_name varchar,' +
                             'date varchar,' +
                             'client uuid,' +
                             'status varchar,'+
                             ');',
                             next);
                             },
                            function(next) {
                                client.execute('CREATE TABLE IF NOT EXISTS '+ config.bdd.keyspace+'.orders (' +
                                    'id uuid PRIMARY KEY,' +
                                    'client_id varchar,' +
                                    'client_first_name varchar,' +
                                    'date_of_issue varchar,' +
                                    'date_of_dispatch varchar,' +
                                    'date_of_reception varchar,' +
                                    'status_order varchar,' +
                                    ');',
                                    next);
                            },function(next) {
                                client.execute('CREATE TABLE IF NOT EXISTS '+ config.bdd.keyspace+'.quotations (' +
                                    'id uuid PRIMARY KEY,' +
                                    'date varchar,' +
                                    'project_name varchar,' +
                                    'client uuid,' +
                                    'status varchar,' +
                                    'amounts text,' +
                                    ');',
                                    next);
                            }
                        ], afterExecution('Error: ', 'Tables created.' , res));

                    }

            }

        );







    },
    drop: function(res){

        var client = new cassandra.Client({contactPoints: ['82.235.3.251']});
        client.execute("DROP KEYSPACE IF EXISTS " + config.bdd.keyspace + ";",
            afterExecution('Error: ', 'Keyspace droped.', res));





    }




};
function afterExecution( errorMessage, successMessage, res) {
    return function(err) {
        if (err) {
            console.log(err);
            return res.json(errorMessage);
        } else {
            console.log(successMessage);
            res.json(successMessage);
        }
    }
}
