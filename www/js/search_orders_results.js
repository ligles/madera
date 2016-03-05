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
                    div.setAttribute('id', order.id);

                    var span_name = document.createElement('span');
                    span_name.innerText = "-> " + order.project_name;

                    var span_id = document.createElement('span');
                    span_id.innerText = "N°" + order.id;

                    var span_date = document.createElement('span');
                    span_date.innerText = order.date;

                    div.appendChild(span_name);
                    div.appendChild(span_id);
                    div.appendChild(span_date);

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
