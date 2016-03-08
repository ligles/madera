/**
 * Created by ligles on 07/03/16.
 */
var config = require('../config');
var cassandra = require('cassandra-driver');
var async = require('async');

module.exports = {

    query: function (query,req,res) {


        var client = new cassandra.Client({contactPoints: [config.bdd.host], keyspace:config.bdd.keyspace });

        switch(query) {
            case 'upsertClient':

                var timeId = cassandra.types.TimeUuid.now();
                var insert,update = null;
                var upsertClient = 'INSERT INTO '+config.bdd.keyspace+'.clients (id_client, id, first_name, last_name, address_1,address_2,city,zip_code,country,phone, mail, birth_date, last_update_time, insert_time)'
                    + 'VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';


                var id_client = null;
                var id = null;




                if ( ! req.body.hasOwnProperty('id')) {


                    id_client  = cassandra.types.uuid();
                    id = null;
                    insert = timeId;
                    update = timeId;

                    getLastId('clients',client, function(result) {


                        id = result;

                        client.execute(upsertClient,
                            [id_client, id, req.body.first_name, req.body.last_name, null, null, null,null, null, null,'mail@test.fr',req.body.birth_date,update, insert],{prepare : true},
                            afterExecution('Error: ', 'Client ' + req.body.first_name +' '+ req.body.last_name + ' inseré. id = '+ id, res));

                    });

                } else {

                    id_client = req.body.id_client;
                    id = req.body.id;
                    insert = req.body.insert_time;
                    update = timeId;
                    client.execute(upsertClient,
                        [id_client, id, req.body.first_name, req.body.last_name, null, null, null,null, null, null,'mail@test.fr',req.body.birth_date,update, insert],{prepare : true},
                        afterExecution('Error: ', 'Client ' + req.body.first_name +' '+ req.body.last_name + ' inseré. id = '+ id, res));




                }




                break;

            case 'deleteClient':
                console.log('deleteclient');
                break;


            case 'getClient':


                if ( ! req.params.hasOwnProperty('id')) {
                    console.log('getclient without  id');
                    client.execute("SELECT id_client, id, first_name, last_name, birth_date FROM " + config.bdd.keyspace + ".clients WHERE last_name = '" + req.params.text + "'; ", function (err, result) {
                        if (err) {
                            console.log(err);
                            res.status(404).send({msg: 'client not found.'});
                        } else {

                            res.send(result.rows);
                        }
                    });

                }else{
                    console.log('getclient with id = ' + req.params.id );
                    client.execute("SELECT id_client, id, first_name, last_name, birth_date FROM " + config.bdd.keyspace + ".clients WHERE id = '" + req.params.id + "'; ", function (err, result) {
                        if (err) {
                            console.log(err);
                            res.status(404).send({msg: 'client not found.'});
                        } else {

                            res.send(result.rows[0]);
                            console.log(result.rows[0]);
                        }
                    });

                }




                break;
            default:
                console.log('default');
                break;
        }

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
                                    'id_client uuid,' +
                                    'id int,' +
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
                                    'last_update_time timeuuid,' +
                                    'insert_time timeuuid,' +
                                    'PRIMARY KEY ((id_client),insert_time, id, last_name, mail)' +
                                    ')WITH CLUSTERING ORDER BY (insert_time DESC);',
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
                                    'id_order uuid,' +
                                    'id varchar,' +
                                    'client_id varchar,' +
                                    'client_first_name varchar,' +
                                    'date_of_issue varchar,' +
                                    'date_of_dispatch varchar,' +
                                    'date_of_reception varchar,' +
                                    'status_order varchar,' +
                                    'PRIMARY KEY (id_order)' +
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
    indexe: function(res){


        var client = new cassandra.Client({contactPoints: [config.bdd.host]});
        client.execute("CREATE KEYSPACE IF NOT EXISTS " + config.bdd.keyspace + " WITH replication " +
            "= {'class' : 'SimpleStrategy', 'replication_factor' : 3};",

            function (err) {
                if ( err) {
                    afterExecution('Error: ', 'Keyspace created.', res);
                } else {

                    async.parallel([
                        function(next) {
                            client.execute('CREATE INDEX ON '+ config.bdd.keyspace+'.clients (' +
                                'last_name' +
                                ');',
                                next);
                        },
                        function(next) {
                            client.execute('CREATE INDEX ON '+ config.bdd.keyspace+'.clients (' +
                                'mail' +
                                ');',
                                next);
                        }
                    ], afterExecution('Error: ', 'index created.' , res));

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

function getLastId(table,client,callback){
    var id = null;

    client.execute("SELECT id, dateof(insert_time) FROM " + config.bdd.keyspace + "."+table+" LIMIT 1; ", function (err, result) {


        if (err) {
            console.log(err);
           callback(err);
        } else {

            if ( result.rows.length > 0 ) {
                id = result.rows[0].id + 1;
            }else{
                id = 1;
            }

            callback(id);

        }

    });

}
