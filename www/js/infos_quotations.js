var initPage = function() {

    var quotation_id = window.localStorage.getItem("quotation_id");
    var quotation_add = window.localStorage.getItem("add_quotation");

    // Track changes
    var modifAmount = function (number) {
        var amount = document.getElementById("infos_amount").value;
        var value = document.getElementById("infos_amount_0" + number).value;
        value.replace('%', '');
        value.replace('€', '');
        value.replace(',', '.');
        value = parseFloat(value);

        document.getElementById("infos_amount_percent_0" + number).value = (value / amount * 100).toFixed(2);
    };

    document.getElementById("infos_amount_01").onchange = function () {
        modifAmount(1);
    };
    document.getElementById("infos_amount_02").onchange = function () {
        modifAmount(2);
    };
    document.getElementById("infos_amount_03").onchange = function () {
        modifAmount(3);
    };
    document.getElementById("infos_amount_04").onchange = function () {
        modifAmount(4);
    };

    if(quotation_add != null && quotation_add == "true") {
        // Hide the loading bar
        try {
            document.getElementsByClassName('load-bar')[0].style.display = "none";
        }
        catch (ex) {}

        document.getElementById("infos_id").innerText = "\"Nouveau\"";
        document.getElementById("modify").innerText = "AJOUTER";
        document.getElementById("infos_status").value = "EN COURS";
        document.getElementById("amounts").style.visibility = "hidden";

        document.getElementById("infos_amount").onchange = function() {
            if(document.getElementById("infos_amount").value > 1) {
                document.getElementById("amounts").style.visibility = "visible";
                document.getElementById("infos_amount_01").value = document.getElementById("infos_amount").value / 4;
                document.getElementById("infos_amount_02").value = document.getElementById("infos_amount").value / 4;
                document.getElementById("infos_amount_03").value = document.getElementById("infos_amount").value / 4;
                document.getElementById("infos_amount_04").value = document.getElementById("infos_amount").value / 4;
                modifAmount(1);
                modifAmount(2);
                modifAmount(3);
                modifAmount(4);
            }
            else {
                document.getElementById("amounts").style.visibility = "hidden";
            }
        };

        var project_id = window.localStorage.getItem("project_id");
        var project_name = window.localStorage.getItem("project_name");

        var first_name =  window.localStorage.getItem("first_name");
        var last_name =  window.localStorage.getItem("last_name");

        if(project_id != null && project_id != "") {

            var date = new Date();
            var day = date.getDate().toString();
            if (day.length < 2) day = "0" + day;
            var month = (date.getMonth() + 1).toString();
            if (month.length < 2) month = "0" + month;
            document.getElementById("infos_date").value = day + "/" + month + "/" + date.getFullYear();

            document.getElementById("modify").onclick = function () {

                var amount_1 = document.getElementById("infos_amount_01").value;
                var amount_2 = document.getElementById("infos_amount_02").value;
                var amount_3 = document.getElementById("infos_amount_03").value;
                var amount_4 = document.getElementById("infos_amount_04").value;

                if (amount_1 == ""
                    || amount_2 == ""
                    || amount_3 == ""
                    || amount_4 == "") {
                    alert("Veuillez renseigner tous les échelonnements.");
                    return;
                }
                if(parseFloat(amount_1)
                    + parseFloat(amount_2)
                    + parseFloat(amount_3)
                    + parseFloat(amount_4)
                != parseFloat(document.getElementById("infos_amount").value)) {
                    alert("Le total des échelonnements ne correspond pas au montant du devis.");
                    return;
                }


                var params =
                    "project_id=" + project_id +
                    "&project_name=" + project_name +
                    "&first_name=" + first_name +
                    "&last_name=" + last_name +
                    "&date=" + document.getElementById("infos_date").value +
                    "&status=" + document.getElementById("infos_status").value +
                    "&amount_1=" + amount_1 +
                    "&amount_2=" + amount_2 +
                    "&amount_3=" + amount_3 +
                    "&amount_4=" + amount_4;

                ajax(
                    "POST",
                    "quotations",
                    params,
                    function(result) {
                       // alert("Ajout effectué! " + result);

                        window.localStorage.setItem("search_quotation", project_id);
                        window.localStorage.setItem("quotation_id", null);
                        window.localStorage.setItem("add_quotation", null);

                        window.location.href = "search_quotations_results.html";
                    },
                    function(status, text) {
                        alert("Erreur lors de l'ajout! " + text);
                    }
                );
            }
        }
        else {
            window.location.href = "search_quotations.html";
        }
    }
    else if(quotation_id != null && quotation_id != "") {

        document.getElementById("modify").innerText = "MODIFIER";

        ajax(
            "GET/ID",
            "quotations",
            quotation_id,
            function(quotation_info) {
                var canModify = true;
                if(quotation_info.status == "ANNULÉ" || quotation_info.status == "TERMINÉ") {
                    canModify = false;
                    document.getElementById("modify").style.display = "none";
                }

                document.getElementById("infos_id").innerText = "N°" + quotation_info.id;
                document.getElementById("infos_date").value = quotation_info.date;
                document.getElementById("infos_status").value = quotation_info.status;

                var amount = 0;
                var i = 0;

                // Start percentage
                quotation_info.amounts.forEach(function(value) {
                    i++;
                    amount += parseFloat(value);

                    document.getElementById("infos_amount_0" + i).value = value;
                    if(!canModify) document.getElementById("infos_amount_0" + i).setAttribute("readonly", "true");
                });
                i = 0;

                // Start amount
                quotation_info.amounts.forEach(function(value) {
                    i++;
                    document.getElementById("infos_amount_percent_0" + i).value = "" + ((value / amount * 100).toFixed(2));
                });

                if(canModify) {
                    document.getElementById("modify").onclick = function() {

                        var status = document.getElementById("infos_status").value;
                        var amount_1 = document.getElementById("infos_amount_01").value;
                        var amount_2 = document.getElementById("infos_amount_02").value;
                        var amount_3 = document.getElementById("infos_amount_03").value;
                        var amount_4 = document.getElementById("infos_amount_04").value;

                        if(amount_1 == "" || amount_1 == 0
                            || amount_2 == "" || amount_2 == 0
                            || amount_3 == "" || amount_3 == 0
                            || amount_4 == "" || amount_4 == 0
                        ) {
                            alert("Veuillez compléter tous les échelonnements.");
                            return;
                        }

                        var params =
                            "id=" + quotation_id +
                            "&status=" + status +
                            "&amount_1=" + amount_1 +
                            "&amount_2=" + amount_2 +
                            "&amount_3=" + amount_3 +
                            "&amount_4=" + amount_4;

                        ajax(
                            "UPDATE",
                            "quotations",
                            params,
                            function(result) {
                                alert("Mise à jour effectué!");
                            },
                            function(status, text) {
                                alert("Erreur lors de la mise à jour!");
                            }
                        );
                    }
                }

                document.getElementById("infos_amount").value = amount;
                document.getElementById("infos_amount").setAttribute("readonly", "true");
            }
        );
    }
    else {
        window.location.href = "search_quotations.html";
    }
};