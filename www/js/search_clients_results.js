var initPage = function() {

    var search_client = window.localStorage.getItem("search_client");

    if(search_client != null && search_client != "") {
        document.getElementById("search_text").innerText = "\"" + search_client + "\"";

        ajax(
            "GET/ALL",
            null,
            function(data) {
                data.forEach(function(customer) {
                    var div = document.createElement('div');
                    div.setAttribute('class', 'one_search_result');
                    div.setAttribute('id', customer.id);

                    var span_last_name = document.createElement('span');
                    span_last_name.innerText = "-> " + customer.last_name;

                    var span_first_name = document.createElement('span');
                    span_first_name.innerText = customer.first_name;

                    var span_id = document.createElement('span');
                    span_id.innerText = "N°" + customer.id;

                    div.appendChild(span_last_name);
                    div.appendChild(span_first_name);
                    div.appendChild(span_id);

                    document.getElementById("results_list").appendChild(div);
                });

                Array.prototype.forEach.call(document.getElementsByClassName("one_search_result"), function(elem) {
                    elem.onclick = function() {
                        window.localStorage.setItem("client_id", elem.id);
                        window.localStorage.setItem("add_client", null);

                        window.location.href = "infos_clients.html"
                    }
                });
            }
        );
    }
    else {
        window.location.href = "search_clients.html";
    }
};

function ajax(query, params, onSuccess, onError) {
    onError = onError || function(status, text) { alert('Erreur ajax (' + status + ') : ' + text); };

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
            else {
                onError(xhttp.status, xhttp.response.text);
            }
        }
    };

    switch(query) {
        case "GET/ALL" :
            xhttp.open("GET", "http://" + AJAX_IP + "/clients", true);
            xhttp.send();
            break;
        case "GET/ID":
            xhttp.open("GET", "http://" + AJAX_IP + "/clients/" + params['id'], true);
            xhttp.send();
            break;
        default :
            onError('000', 'Mauvaise requête.');
            break;
    }
}