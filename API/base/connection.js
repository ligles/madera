/**
 * Created by ligles on 07/03/16.
 */
var cassandra = require('cassandra-driver');
var async = require('async');
var keyspace = "madera";
module.exports = {

    query: function (query,params) {




        var tquery = 'SELECT email, last_name FROM user_profiles WHERE key=?';

        //Connect to the cluster
        var client = new cassandra.Client({contactPoints: ['82.235.3.251'], keyspace:keyspace });

        client.execute(tquery, ['guy'], function(err, result) {
            console.log(err);
            console.log('got user profile with email ' + result.rows[0].email);
        });

        /*
        client.connect(function (err) {
            if (err) {
                client.shutdown();
                return console.error('There was an error when connecting', err);
            }
            console.log('Connected to cluster with %d host(s): %j', client.hosts.length, client.hosts.keys());
            console.log('Keyspaces: %j', Object.keys(client.metadata.keyspaces));
            //console.log('Shutting down');
            // client.shutdown();
        });
*/

    },
    init: function(res){


        var client = new cassandra.Client({contactPoints: ['82.235.3.251']});
        client.execute("CREATE KEYSPACE IF NOT EXISTS " + keyspace + " WITH replication " +
            "= {'class' : 'SimpleStrategy', 'replication_factor' : 3};",

            function (err) {
                    if ( err) {
                        afterExecution('Error: ', 'Keyspace created.', res);
                    } else {
                        console.log("Keyspace created");
                        async.parallel([
                            function(next) {
                                client.execute('CREATE TABLE IF NOT EXISTS '+ keyspace+'.clients (' +
                                    'id uuid PRIMARY KEY,' +
                                    'first_name varchar,' +
                                    'last_name varchar,' +
                                    'address_1 varchar,' +
                                    'address_2 varchar,' +
                                    'zip_code varchar,' +
                                    'country varchar,' +
                                    'phone int,' +
                                    'mail varchar,' +
                                    'birth_date varchar' +
                                    ');',
                                    next);
                            } ,
                             function(next) {
                             client.execute('CREATE TABLE IF NOT EXISTS '+ keyspace+'.projects (' +
                             'id uuid PRIMARY KEY,' +
                             'project_name varchar,' +
                             'date varchar,' +
                             'client uuid,' +
                             'status varchar,'+
                             ');',
                             next);
                             },
                            function(next) {
                                client.execute('CREATE TABLE IF NOT EXISTS '+ keyspace+'.orders (' +
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
                                client.execute('CREATE TABLE IF NOT EXISTS '+ keyspace+'.quotations (' +
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
        client.execute("DROP KEYSPACE IF EXISTS " + keyspace + ";",
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
