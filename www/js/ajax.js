//-----------------------------------------------------------------------
//                   PARAMETERS

var AJAX_IP = "10.176.130.34:3000";

var AJAX_TOKEN = "MADERA";

//-----------------------------------------------------------------------

function ajax(query, category, param, onSuccess, onError) {
    onError = onError || function(status, text) { alert(text); };

    var xhttp;

    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    }
    else {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == XMLHttpRequest.DONE) {

            try {
                document.getElementsByClassName('load-bar')[0].style.display = "none";
            }
            catch (ex) {}

            if (xhttp.status == 200) {
                onSuccess(JSON.parse(xhttp.response));
            }
            else if (xhttp.status == 0) {
                onError("connexion", "Veuillez activer une connexion réseau puis réessayer.");            }
            else {
                var msg = [];
                msg[200] = JSON.stringify("Requête effectué avec succès.");
                msg[204] = JSON.stringify("Aucun résultat.");
                msg[400] = JSON.stringify("Paramètre manquant.");

                onError(xhttp.status, msg[xhttp.status]);            }
        }
    };

    switch(query) {
        case "GET/ALL" : // Get all the things from a category
            xhttp.open("GET", "http://" + AJAX_IP + "/" + category, true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.setRequestHeader("token", AJAX_TOKEN);
            xhttp.send();
            break;
        case "GET/ID": // Get an item in a category by its ID
            xhttp.open("GET", "http://" + AJAX_IP + "/" + category + "/" + param, true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.setRequestHeader("token", AJAX_TOKEN);
            xhttp.send();
            break;
        case "GET/SEARCH": // Get all items with searched text in it
            xhttp.open("GET", "http://" + AJAX_IP + "/" + category + "/search/" + param, true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.setRequestHeader("token", AJAX_TOKEN);
            xhttp.send();
            break;

        case "POST": // Add an item
            xhttp.open("POST", "http://" + AJAX_IP + "/" + category + "/", true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.setRequestHeader("token", AJAX_TOKEN);
            xhttp.send(param);
            break;

        case "UPDATE": // Update an item
            xhttp.open("POST", "http://" + AJAX_IP + "/" + category + "/update/", true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.setRequestHeader("token", AJAX_TOKEN);
            xhttp.send(param);
            break;

        default :
            onError('000', 'Mauvaise requ�te.');
            break;
    }
}