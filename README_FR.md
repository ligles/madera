##Projet MADERA


Le projet "MADERA" est un projet r�alis� dans le cadre de la formation "Responsable en Ing�nierie des logiciels" (Bac+4) dispens�e en alternance au CESI.

Ce projet est men� sur 2 ans, en groupe de 3~4 personnes, et est d�terminant pour le dipl�me. Le projet n'ayant rien de confidentiel, nous avons choisi de le partager sur Github.

###Team

* [Anthony G. aka Jaskar](https://github.com/Jaskar)
* [A.V. aka anais49](https://github.com/anais49)
* [G.V. aka ligles](https://github.com/ligles)


###Technologies

Ce projet comprend trois parties :
* Application mobile : Cordova / Phonegap
* API : NodeJS
* Base de donn�es : Cassandra


###Comment l'installer ?

Voici les diff�rentes �tapes pour mettre en place ce projet.


Application mobile :
* Installer cordova / phonegap sur votre machine.
* Lancer la commande "cordova run wp8" / "android" / "ios" pour d�ployer sur votre p�riph�rique mobile.


API (serveur) :
* Installer NodeJS sur votre machine.
* Lancer la commande "npm install" pour installer les d�pendances.
* Lancer la commande "node app.js" pour lancer le serveur. (Ctrl + C pour l'arr�ter).

	
Base de donn�es : [Indisponible pour le moment]
* Installer Cassandra sur votre machine.
* Importer le script de cr�ation de la base. [Indisponible pour le moment]


Authentification :
* L'application ne peux plus fonctionner sur �mulateur avec l'authentification
* Ouvrir le fichier "www/js/ajax.js" pour modifier l'IP de l'API et la cl� (AJAX_IP et AJAX_TOKEN).
* Dans le m�me fichier "www/js/ajax.js", d�commenter les lignes 76-80 (request headers)
* Ouvrir le fichier "API/basicToken.js" pour indiquer la m�me cl� que dans l'applicaton (TOKEN).
* Ouvrir le fichier "API/router/index.js" et commenter les lignes 16-17.