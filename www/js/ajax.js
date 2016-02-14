// AJAX
//var AJAX_IP = "10.176.131.236:3000";
var AJAX_IP = "192.168.1.72:3000";
var AJAX_TOKEN = "";

function ajax(query, category, param, onSuccess, onError) {
    onError = onError || function(status, text) { alert('Erreur ' + category + ' (' + status + ') : ' + text); };

    var xhttp;

    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    } else {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == XMLHttpRequest.DONE) {
            if (xhttp.status == 200) {
                onSuccess(JSON.parse(xhttp.response));
            }
            else if (xhttp.status == 0) {
                onError("connexion", "Veuillez activer une connexion réseau puis réessayer.");
            }
            else {
                onError(xhttp.status, xhttp.statusText);
            }
        }
    };

    switch(query) {
        case "GET/ALL" : // Get all the things from a category
            xhttp.open("GET", "http://" + AJAX_IP + "/" + category, true);
            xhttp.send();
            break;
        case "GET/ID": // Get an item in a category by its ID
            xhttp.open("GET", "http://" + AJAX_IP + "/" + category + "/" + param, true);
            xhttp.send();
            break;
        case "GET/SEARCH": // Get all items with searched text in it
            xhttp.open("GET", "http://" + AJAX_IP + "/" + category + "/search/" + param, true);
            xhttp.send();
            break;

        case "POST": // Add an item
            xhttp.open("POST", "http://" + AJAX_IP + "/" + category + "/", true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send(param);
            break;

        case "UPDATE": // Update an item
            xhttp.open("POST", "http://" + AJAX_IP + "/" + category + "/update/", true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send(param);
            break;

        default :
            onError('000', 'Mauvaise requête.');
            break;
    }
}