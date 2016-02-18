##MADERA Project


The "MADERA" project is a school project, realised during a professionnal formation at the french school "CESI".

This project is done during 2 years, in team of 3~4 persons. It is desicive for the diploma. This project is not confidential, so we choose to share it on Github.


###Readme Languages

* [French / Français](https://github.com/ligles/madera/blob/master/README_FR.md)


###Team

* [Anthony G. aka Jaskar](https://github.com/Jaskar)
* [A.V. aka anais49](https://github.com/anais49)
* [G.V. aka ligles](https://github.com/ligles)


###Technologies

This project is made of three parts :
* Mobile application : Cordova / Phonegap
* API : NodeJS
* Database : Cassandra

	
###How to install it ?

There are the steps to install and deploy it.


Mobile application :
* Install cordova / phonegap on your computer.
* Enter "cordova run wp8" / "android" / "ios" to deploy the application on your device.


API (server) :
* Install NodeJS on your computer.
* Enter "npm install" to install the NodeJS dependencies.
* Enter "node app.js" to launch the API.


Database : [Unavailable yet]
* Install the Cassandra database on your computer.
* Import the database creation script. [Unavailable yet]


Authentication :
* The app can't run on phone emulator with authentication.
* Open the file "www/js/ajax.js" to set the API IP and a Token (AJAX_IP and AJAX_TOKEN).
* Open the file "API/basicToken.js" to set the same Token as in the application (TOKEN).
* Open the file "API/router/index.js" and comment lines 16-17.