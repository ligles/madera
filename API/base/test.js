/**
 * Created by ligles on 07/03/16.
 */


module.exports = function (app) {
    var keyspace = "madera";
    var cassandra = require('cassandra-driver');
    var async = require('async');
    var client = new cassandra.Client({contactPoints: ['82.235.3.251']});
    client.execute("CREATE KEYSPACE IF NOT EXISTS " + keyspace + " WITH replication " +
        "= {'class' : 'SimpleStrategy', 'replication_factor' : 3};",

        function (err, result) {
            if ( err) {
                afterExecution('Error: ', 'Keyspace created.', res);
            } else {
                console.log("Keyspace created");
            }

        }

    );



   async.parallel([
        function(next) {
            client.execute('CREATE TABLE IF NOT EXISTS '+ keyspace+'.clients (' +
                'id uuid PRIMARY KEY,' +
                'first_name varchar,' +
                'last_name varchar,' +
                'address_1 varchar,' +
                'address_2 varchar,' +
                'zip-code varchar,' +
                'country varchar,' +
                'phone int,' +
                'mail varchar,' +
                'birth_date varchar' +
                ');',
                next);
        },
         function(next) {
         client.execute('CREATE TABLE IF NOT EXISTS '+ keyspace+'.projects (' +
         'id uuid PRIMARY KEY,' +
         'first_name varchar,' +
         'last_name varchar,' +
         'address_1 varchar,' +
         'address_2 varchar,' +
         'zip-code varchar,' +
         'country varchar,' +
         'phone int,' +
         'mail varchar,' +
         'birth_date varchar' +
         ');',
         next);
         },
         function(next) {
         client.execute('CREATE TABLE IF NOT EXISTS '+ keyspace+'.playlists (' +
         'id uuid,' +
         'title text,' +
         'album text,' +
         'artist text,' +
         'song_id uuid,' +
         'PRIMARY KEY (id, title, album, artist)' +
         ');',
         next);
         }
    ], afterExecution('Error: ', 'Tables created.' , res));


}