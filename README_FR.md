##Projet MADERA


Le projet "MADERA" est un projet réalisé dans le cadre de la formation "Responsable en Ingénierie des logiciels" (Bac+4) dispensée en alternance au CESI.

Ce projet est mené sur 2 ans, en groupe de 3~4 personnes, et est déterminant pour le dipléme. Le projet n'ayant rien de confidentiel, nous avons choisi de le partager sur Github.

###Team

* [Anthony G. aka Jaskar](https://github.com/Jaskar)
* [A.V. aka anais49](https://github.com/anais49)
* [G.V. aka ligles](https://github.com/ligles)


###Technologies

Ce projet comprend trois parties :
* Application mobile : Cordova / Phonegap
* API : NodeJS
* Base de données : Cassandra


###Comment l'installer ?


Voici les différentes étapes pour mettre en place ce projet.

fichier de config:
* Creer un fichier de config "config.js" dans le repertoire API.

***********************************************************************************
            ex:
            var config = {};

            config.bdd = {};
            config.api = {};

            config.bdd.host = '';
            config.bdd.port = ;
            config.bdd.keyspace = '';
            config.api.port = process.env.PORT || 3000;
            config.api.host = '';
            config.api.token = '';

            module.exports = config;
**********************************************************************************


Application mobile :
* Installer cordova / phonegap sur votre machine.
* Lancer la commande "cordova run wp8" / "android" / "ios" pour déployer sur votre périphérique mobile.


API (serveur) :
* Installer NodeJS sur votre machine.
* Lancer la commande "npm install" pour installer les dépendances.
* Lancer la commande "node app.js" pour lancer le serveur. (Ctrl + C pour l'arréter).

	
Base de données : [Indisponible pour le moment]
* Installer Cassandra sur votre machine.
* Importer le script de création de la base. [Indisponible pour le moment]


Authentification :
* L'application ne peux plus fonctionner sur émulateur avec l'authentification
* Ouvrir le fichier "www/js/ajax.js" pour modifier l'IP de l'API et la clé (AJAX_IP et AJAX_TOKEN).
* Dans le méme fichier "www/js/ajax.js", décommenter les lignes 76-80 (request headers)
* Ouvrir le fichier "API/basicToken.js" pour indiquer la méme clé que dans l'applicaton (TOKEN).
* Ouvrir le fichier "API/router/index.js" et commenter les lignes 16-17.