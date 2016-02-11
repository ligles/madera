var initPage = function() {

    var quotation_id = window.localStorage.getItem("quotation_id");
    var quotation_add = window.localStorage.getItem("add_quotation");

    if(quotation_add != null && quotation_add == "true") {

        document.getElementById("infos_id").innerText = "\"Nouveau\"";
        document.getElementById("modify").innerText = "AJOUTER";

        var date = new Date();
        document.getElementById("infos_date").value = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    }
    else if(quotation_id != null && quotation_id != "") {

        document.getElementById("modify").innerText = "MODIFIER";

        var quotation_info = data['quotations'][0];

        document.getElementById("infos_id").innerText = "N°" + quotation_info.id;
        document.getElementById("infos_date").value = quotation_info.date;
        document.getElementById("infos_status").value = quotation_info.status;

        var amount = 0;
        var i = 0;

        // Start percentage
        quotation_info.amounts.forEach(function(value) {
            i++;
            amount += parseInt(value);

            document.getElementById("infos_amount_0" + i).value = value + "€";
        });
        i = 0;

        // Start amount
        quotation_info.amounts.forEach(function(value) {
            i++;
            document.getElementById("infos_amount_percent_0" + i).value = (value / amount * 100).toFixed(2) + "%";
        });

        // Track changes
        var modifPercentage = function(number) {
            var value = document.getElementById("infos_amount_percent_0" + number).value;
            value.replace('%','');
            value.replace('€','');
            value.replace(',','.');
            value = parseFloat(value);

            document.getElementById("infos_amount_0" + number).value = (amount / 100 * value) + "€";
        };
        var modifAmount = function(number) {
            var value = document.getElementById("infos_amount_0" + number).value;
            value.replace('%','');
            value.replace('€','');
            value.replace(',','.');
            value = parseFloat(value);

            document.getElementById("infos_amount_percent_0" + number).value = (value / amount * 100).toFixed(2) + "%";
        };

        document.getElementById("infos_amount_01").onkeyup = function() {modifAmount(1);};
        document.getElementById("infos_amount_02").onkeyup = function() {modifAmount(2);};
        document.getElementById("infos_amount_03").onkeyup = function() {modifAmount(3);};
        document.getElementById("infos_amount_04").onkeyup = function() {modifAmount(4);};

        document.getElementById("infos_amount_percent_01").onkeyup = function() {modifPercentage(1);};
        document.getElementById("infos_amount_percent_02").onkeyup = function() {modifPercentage(2);};
        document.getElementById("infos_amount_percent_03").onkeyup = function() {modifPercentage(3);};
        document.getElementById("infos_amount_percent_04").onkeyup = function() {modifPercentage(4);};

        document.getElementById("infos_amount").value = amount;
        document.getElementById("infos_amount").setAttribute("readonly", "true");
    }
    else {
        window.location.href = "search_clients.html";
    }
};