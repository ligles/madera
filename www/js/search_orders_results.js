var initPage = function() {

    var search_order = window.localStorage.getItem("search_order");

    if(search_order != null && search_order != "") {
        document.getElementById("search_text").innerText = "\"" + search_order + "\"";

        var data = [];

        ajax(
            "GET/SEARCH",
            "orders",
            search_order,
            function(data) {
                data.forEach(function(order) {
                    var div = document.createElement('div');
                    div.setAttribute('class', 'one_search_result');
                    div.setAttribute('id', order.id_order);

                    var span_id = document.createElement('span');
                    span_id.innerText = "N°" + order.client_id;

                    var span_client = document.createElement('span');
                    span_client.innerText = "CLIENT" + order.client_id +
                        " : " + order.client_first_name;

                    var span_date_issue = document.createElement('span');
                    span_date_issue.innerText = order.date_of_issue;

                    var span_status = document.createElement('span');
                    span_status.innerText = order.status_order;

                    div.appendChild(span_id);
                    div.appendChild(span_client);
                    div.appendChild(span_date_issue);
                    div.appendChild(span_status);


                    document.getElementById("results_list").appendChild(div);
                });

                Array.prototype.forEach.call(document.getElementsByClassName("one_search_result"), function(elem) {
                    elem.onclick = function() {
                        window.localStorage.setItem("order_id", elem.id);
                        window.localStorage.setItem("add_order", null);

                        window.location.href = "infos_orders.html"
                    }
                });
            }
        );
    }
    else {
        window.location.href = "search_orders.html";
    }
};
