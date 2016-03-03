//-----------------------------------------------------------------------
//                   PARAMETERS

var AJAX_IP = "localhost:3000";
var AJAX_TOKEN = "MADERA";

//-----------------------------------------------------------------------

function ajax(query, category, param, onSuccess, onError) {
    onError = onError || function(status, text) { alert('Erreur ' + category + ' (' + status + ') : ' + text); };

    var xhttp;

    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    }
    else {
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

    var xhttpType = "GET";
    var xhttpLink = "";
    var xhttpParam = null;

    switch(query) {
        case "GET/ALL" : // Get all the things from a category
            xhttpType = "GET";
            xhttpLink = "http://" + AJAX_IP + "/" + category;
            break;
        case "GET/ID": // Get an item in a category by its ID
            xhttpType = "GET";
            xhttpLink = "http://" + AJAX_IP + "/" + category + "/" + param;
            break;
        case "GET/SEARCH": // Get all items with searched text in it
            xhttpType = "GET";
            xhttpLink = "http://" + AJAX_IP + "/" + category + "/search/" + param;
            break;

        case "POST": // Add an item
            xhttpType = "POST";
            xhttpLink = "http://" + AJAX_IP + "/" + category + "/";
            xhttpParam = param;
            break;

        case "UPDATE": // Update an item
            xhttpType = "POST";
            xhttpLink = "http://" + AJAX_IP + "/" + category + "/update/";
            xhttpParam = param;
            break;

        default :
            onError('000', 'Mauvaise requête.');
            break;
    }

    xhttp.open(xhttpType, xhttpLink, true);
    xhttp.setRequestHeader("Cache-Control", "no-cache");
    xhttp.setRequestHeader("Pragma", "no-cache");
    xhttp.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.setRequestHeader("token", AJAX_TOKEN);
    if(xhttpParam) xhttp.send(param);
    else xhttp.send();

}