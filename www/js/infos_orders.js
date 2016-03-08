var initPage = function() {

    var order_id = window.localStorage.getItem("order_id");
    var order_add = window.localStorage.getItem("add_order");

    if(order_add != null && order_add == "true") {

        document.getElementById("infos_id").innerText = "\"Nouveau\"";
        document.getElementById("modify").innerText = "AJOUTER";
        document.getElementById("infos_status").value = "EN ATTENTE";

        var order_id = window.localStorage.getItem("order_id");

        if(order_id != null && order_id != "") {
            document.getElementById("infos_client_id").value = client_id;
            document.getElementById("infos_client_name").value = client_id;
            document.getElementById("infos_status").value = "ATTENTE";

            var date = new Date();
            var day = date.getDate().toString();
            if(day.length < 2) day = "0" + day;
            var month = (date.getMonth() + 1).toString();
            if(month.length < 2) month = "0" + month;

            document.getElementById("infos_date_of_isssue").value = day + "/" + month + "/" + date.getFullYear();

            document.getElementById("modify").onclick = function() {

                var client_id = document.getElementById("infos_client_id").value;
                var date = document.getElementById("infos_date_of_isssue").value;
                var status = document.getElementById("infos_status").value;

                var params =
                    "id_order=" + order_id +
                    "&client_id=" + client_id +
                    "&date_of_issue=" + date +
                    "&status_order=" + status;

                ajax(
                    "POST",
                    "orders",
                    params,
                    function(result) {
                        alert("Ajout effectué! " + result);
                    },
                    function(status, text) {
                        alert("Erreur lors de l'ajout! " + text);
                    }
                );
            }
        }
        else {
            window.location.href = "search_orders.html";
        }

    }
    else if(order_id != null && order_id != "") {

        document.getElementById("modify").innerText = "MODIFIER";
        document.getElementsByClassName("separationLine")[1].style.display = "block";

    }
    else {
        ajax(
            "GET/ID",
            "orders",
            order_id,
            function(order_info) {

                document.getElementById("infos_id").innerText = "N°" + order_info.id;
                document.getElementById("infos_client_id").value = order_info.client_id;
                document.getElementById("infos_client_name").value = order_info.date;
                document.getElementById("infos_date_of_isssue").value = order_info.date_emission;
                document.getElementById("infos_date_of_dispatch").value = order_info.date_emission;
                document.getElementById("infos_date_of_reception").value = order_info.date_emission;
                document.getElementById("infos_status").value = order_info.status;

                document.getElementById("modify").onclick = function() {

                    var name = document.getElementById("infos_id").value;
                    var client_id = document.getElementById("infos_client_id").value;
                    var date_issue = document.getElementById("infos_date_of_isssue").value;
                    var status = document.getElementById("infos_status").value;

                    if(name == "") {
                        alert("Veuillez renseigner un nom.");
                        return;
                    }

                    var params =
                        "id_order=" + order_id +
                        "&client_id=" + client_id +
                        "&date_of_issue=" + date_issue +
                        "&status_order=" + status;

                    ajax(
                        "UPDATE",
                        "orders",
                        params,
                        function(result) {
                            alert("Mise à jour effectué! " + result);
                        },
                        function(status, text) {
                            alert("Erreur lors de la mise à jour! " + text);
                        }
                    );
                }
            }
        );
        window.location.href = "search_orders.html";
    }
};