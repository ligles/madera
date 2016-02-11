var data = [];
data['customers'] = [
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
data['projects'] = [
    {
        "id":"000003001",
        "project_name":"Abris de jardin",
        "date":"14/09/2015",
        "client":"000003",
        "status":"EN COURS"
    },
    {
        "id":"000003002",
        "project_name":"Chalet en Suisse",
        "date":"17/12/2015",
        "client":"000003",
        "status":"VALIDATION"
    }
];
data['quotations'] = [
    {
        "id":"00000300101",
        "date":"17/12/2015",
        "project_name":"Abris de jardin",
        "client":"G. Vandecandelaere",
        "status":"ANNULÉ",
        "amounts":[
            "30000",
            "30000",
            "39500",
            "100500"
        ]
    },
    {
        "id":"00000300102",
        "date":"18/12/2015",
        "project_name":"Abris de jardin",
        "client":"G. Vandecandelaere",
        "status":"EN COURS",
        "amounts":[
            "20000",
            "20000",
            "10000",
            "150000"
        ]
    }
];

/*
ATTENTE
VALIDATION
EN COURS
TERMINÉ
ANNULÉ
*/

document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("menu").onclick = function(e) {
        window.location = './index.html';
    };
    document.getElementById("return").onclick = function(e) {
        window.history.back();
    };

    initPage();
});


var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();