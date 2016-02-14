var initPage = function() {

    var search_quotation = window.localStorage.getItem("search_quotation");

    if(search_quotation != null && search_quotation != "") {
        document.getElementById("search_text").innerText = "\"" + search_quotation + "\"";

        ajax(
            "GET/SEARCH",
            "quotations",
            search_quotation,
            function(data) {
                console.log(data);

                data.forEach(function(quotation) {

                    ////Don't display if canceled or finished
                    //if(quotation.status == "ANNULÉ" || quotation.status == "TERMINÉ") return;

                    var div = document.createElement('div');
                    div.setAttribute('class', 'one_search_result');
                    div.setAttribute('id', quotation.id);

                     var span_name = document.createElement('span');
                    span_name.innerText = "-> " + quotation.project_name;

                    var span_id = document.createElement('span');
                    span_id.innerText = "N°" + quotation.id;

                    var span_client_name = document.createElement('span');
                    span_client_name.innerText = quotation.client;

                    var span_statut = document.createElement('span');
                    span_statut.innerText = quotation.status;

                    div.appendChild(span_name);
                    div.appendChild(span_id);
                    div.appendChild(span_client_name);
                    div.appendChild(span_statut);

                    document.getElementById("results_list").appendChild(div);
                });

                Array.prototype.forEach.call(document.getElementsByClassName("one_search_result"), function(elem) {
                    elem.onclick = function() {
                        window.localStorage.setItem("quotation_id", elem.id);
                        window.localStorage.setItem("add_quotation", null);

                        window.location.href = "infos_quotations.html"
                    }
                });
            }
        );
    }
    else {
        window.location.href = "search_quotations.html";
    }
};