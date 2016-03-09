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



                    client.execute("SELECT id_client, id, first_name, last_name, birth_date FROM " + config.bdd.keyspace + ".clients WHERE last_name  = ?;", [req.params.text],{prepare : true}, function (err, result) {
                        if (err) {
                            console.log(err);
                            res.status(404).send({msg: 'client not found.'});
                        } else {

                            var client_tab = result.rows;
                            if ( !result.rows.length > 0 ) {
                                res.status(204);
                                res.header("Access-Control-Allow-Origin", "*");
                                res.send('204');
                            }else{
                                res.send(client_tab);

                            }



                        }
                    });



                }else{
                    console.log('getclient with id = ' + req.params.id );
                    client.execute("SELECT id_client, id, first_name, last_name, birth_date FROM " + config.bdd.keyspace + ".clients WHERE id  = ? ALLOW FILTERING;", [req.params.id],{prepare : true}, function (err, result) {
                        if (err) {
                            console.log(err);
                            res.status(404).send({msg: 'client not found.'});
                        } else {
                            console.log(result);

                            var client_tab = result.rows[0];
                            client_tab.projects_list = new Array();//TODO add projet

                            console.log(client_tab);

                            res.send(client_tab);


                        }
                    });


                }




                break;

            case 'upsertProjects':


                console.log("add project");
                var timeId = cassandra.types.TimeUuid.now();
                var insert,update = null;
                var upsertProjects = 'INSERT INTO '+config.bdd.keyspace+'.projects (id_project, id, id_client,first_name, last_name, project_name, date, status,last_update_time,insert_time )'
                    + 'VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';


                var id_project = null;
                var id = null;


                console.log("param = "+ req.body.first_name + "   &&  "+ req.body.last_name);

                if ( ! req.body.hasOwnProperty('id')) {


                    id_project  = cassandra.types.uuid();
                    id = null;
                    insert = timeId;
                    update = timeId;

                    getLastId('projects',client, function(result) {


                        id = result;
                       // id = 1;
                        client.execute(upsertProjects,
                            [id_project, id, req.body.client, req.body.first_name,req.body.last_name,req.body.project_name, req.body.date, req.body.status, update, insert],{prepare : true},
                            afterExecution('Error: ', 'Projet ' + req.body.project_name +' '+ req.body.last_name + ' inseré. id = '+ id, res));

                    });

                } else {

                    id_project = req.body.id_project;
                    id = req.body.id;
                    insert = req.body.insert_time;
                    update = timeId;
                    client.execute(upsertProjects,
                        [id_project, id, req.body.client, req.body.first_name,req.body.last_name,req.body.project_name, req.body.date, req.body.status, update, insert],{prepare : true},
                        afterExecution('Error: ', 'Projet ' + req.body.project_name +' '+ req.body.last_name + ' inseré. id = '+ id, res));




                }




                break;
            case 'getProject':


                if ( ! req.params.hasOwnProperty('id')) {
                    console.log('getproject without  id');


                    client.execute("SELECT id_project,id_client,first_name, last_name, id, project_name, date, status, last_update_time, insert_time FROM " + config.bdd.keyspace + ".projects WHERE project_name  = ?;", [req.params.text],{prepare : true}, function (err, result) {
                        if (err) {
                            console.log(err);
                            res.status(404).send({msg: 'project not found.'});
                        } else {

                            var project_tab = result.rows;


                            res.send(project_tab);



                        }
                    });



                }else{
                    console.log('getproject with id = ' + req.params.id );
                    client.execute("SELECT id_project,id_client,first_name, last_name, id, project_name, date, status, last_update_time, insert_time FROM " + config.bdd.keyspace + ".projects WHERE id  = ? ALLOW FILTERING;", [req.params.id],{prepare : true}, function (err, result) {
                        if (err) {
                            console.log(err);
                            res.status(404).send({msg: 'project not found.'});
                        } else {
                            console.log(result);

                            var project_tab = result.rows[0];
                            project_tab.quotations_list = new Array();//TODO add projet

                            console.log(project_tab);

                            res.send(project_tab);


                        }
                    });


                }




                break;

            case 'upsertQuotations':

                /*
                 'id_quotation uuid,' +
                 'id int,' +
                 'id_project int,' +
                 'date varchar,' +
                 'reference varchar,' +
                 //  'client uuid,' +
                 'status varchar,' +
                 'amounts text,' +
                 'last_update_time timeuuid,' +
                 'insert_time timeuuid,' +
                 'PRIMARY KEY ((id_quotation),id,reference)' +
                 ')WITH CLUSTERING ORDER BY (id DESC);'

                 */




                var timeId = cassandra.types.TimeUuid.now();
                var insert,update = null;
                var upsertQuotations = 'INSERT INTO '+config.bdd.keyspace+'.quotations (id_quotation, id, id_project, project_name,first_name, last_name, date, reference, status, amounts, last_update_time,insert_time )'
                    + 'VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';


                var id_project = null;
                var id = null;
                var reference = null; //TODO generate ref

                var amounts = new Object();

                amounts.amount=[req.body.amount_1,req.body.amount_2,req.body.amount_3,req.body.amount_4];
                amounts = JSON.stringify(amounts);



                if ( ! req.body.hasOwnProperty('id')) {

                console.log("param = "+ req.body.first_name + "   &&  "+ req.body.last_name);

                    id_quotation  = cassandra.types.uuid();
                    id = null;
                    insert = timeId;
                    update = timeId;

                    getLastId('quotations',client, function(result) {


                        id = result;
                        reference = id;
                        // id = 1;
                        client.execute(upsertQuotations,
                            [id_quotation, id, req.body.project_id,req.body.project_name, req.body.first_name, req.body.last_name, req.body.date,reference, req.body.status, amounts, update, insert],{prepare : true},
                            afterExecution('Error: ', 'Devis =  ' + reference + ' inseré. id = '+ id, res));

                    });

                } else {

                    id_quotation = req.body.quotation_id;
                    id = req.body.id;
                    insert = req.body.insert_time;
                    update = timeId;
                    client.execute(upsertQuotations,
                        [id_quotation, id, req.body.project_id,req.body.project_name, req.body.date,reference, req.body.status, amounts, update, insert],{prepare : true},
                        afterExecution('Error: ', 'Devis =  ' + reference + ' inseré. id = '+ id, res));

                }

                break;

            case 'getQuotation':


                if ( ! req.params.hasOwnProperty('id')) {
                    console.log('getquotation without  id');


                    client.execute("SELECT id_quotation, id, id_project,project_name,first_name, last_name, date, reference, status, amounts, last_update_time,insert_time  FROM " + config.bdd.keyspace + ".quotations WHERE reference  = ?;", [req.params.text],{prepare : true}, function (err, result) {
                        if (err) {
                            console.log(err);
                            res.status(404).send({msg: 'quotation not found.'});
                        } else {


                            var quotation_tab = result.rows;

                            res.send(quotation_tab);



                        }
                    });



                }else{
                    var amounts = null;

                    client.execute("SELECT id_quotation, id, id_project,project_name,first_name, last_name, date, reference, status, amounts, last_update_time,insert_time FROM " + config.bdd.keyspace + ".quotations WHERE id  = ? ALLOW FILTERING;", [req.params.id],{prepare : true}, function (err, result) {
                        if (err) {
                            console.log(err);
                            res.status(404).send({msg: 'quotation not found.'});
                        } else {
                            console.log(result);




                            var quotation_tab = result.rows[0];
                            amounts = JSON.parse(quotation_tab.amounts);


                            quotation_tab.amounts =amounts.amount;

                            quotation_tab.components_list = new Array();//TODO add projet



                            res.send(quotation_tab);
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
                                    'PRIMARY KEY ((id_client),id,last_name, mail)' +
                                    ')WITH CLUSTERING ORDER BY (id DESC);',
                                    next);
                            } ,
                             function(next) {
                                     client.execute('CREATE TABLE IF NOT EXISTS '+ config.bdd.keyspace+'.projects (' +
                                     'id_project uuid,'+
                                     'id int,' +
                                     'first_name varchar,' +
                                     'last_name varchar,' +
                                     'id_client int,' +
                                     'project_name varchar,' +
                                     'date varchar,' +
                                     'status varchar,'+
                                     'last_update_time timeuuid,' +
                                     'insert_time timeuuid,' +
                                     'PRIMARY KEY ((id_project),id,project_name)' +
                                     ')WITH CLUSTERING ORDER BY (id DESC);',
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
                                    'id_quotation uuid,' +
                                    'id int,' +
                                    'id_project int,' +
                                    'project_name varchar,' +
                                    'first_name varchar,' +
                                    'last_name varchar,' +
                                    'date varchar,' +
                                    'reference int,' +
                                  //  'client uuid,' +
                                    'status varchar,' +
                                    'amounts varchar,' +
                                    'last_update_time timeuuid,' +
                                    'insert_time timeuuid,' +
                                    'PRIMARY KEY ((id_quotation),id,reference)' +
                                    ')WITH CLUSTERING ORDER BY (id DESC);',
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
                        },
                        function(next) {
                            client.execute('CREATE INDEX ON '+ config.bdd.keyspace+'.projects (' +
                                'project_name' +
                                ');',
                                next);
                        },
                        function(next) {
                            client.execute('CREATE INDEX ON '+ config.bdd.keyspace+'.quotations (' +
                                'reference' +
                                ');',
                                next);
                        },
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

        client.execute("SELECT id FROM " + config.bdd.keyspace + "."+table+" LIMIT 1; ",function (err, result) {


        if (err) {
            console.log(err);
           callback(err);
        } else {
            console.log("get last id =" +result);
            console.log("get row =" +result.rows);
            if ( result.rows.length > 0 ) {
                console.log("get last id" +result.rows[0].id);
                id = result.rows[0].id + 1;
            }else{
                console.log("pass ici");
                id = 1;
            }

            callback(id);

        }

    });

}
