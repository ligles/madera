var initPage = function() {

    var project_id = window.localStorage.getItem("project_id");
    var project_add = window.localStorage.getItem("add_project");

    if(project_add != null && project_add == "true") {

        document.getElementById("infos_id").innerText = "\"Nouveau\"";
        document.getElementById("modify").innerText = "AJOUTER";
        document.getElementById("infos_status").value = "ATTENTE";

        var client_id = window.localStorage.getItem("client_id");

        if(client_id != null && client_id != "") {
            document.getElementById("infos_client").value = client_id;
            document.getElementById("infos_client").setAttribute("readonly");

            var date = new Date();
            document.getElementById("infos_date").value = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
        }

    }
    else if(project_id != null && project_id != "") {

        document.getElementById("modify").innerText = "MODIFIER";
        document.getElementById("quotations_part").style.display = "block";
        document.getElementsByClassName("separationLine")[1].style.display = "block";

        var project_info = data['projects'][0];

        document.getElementById("infos_id").innerText = "N°" + project_info.id;
        document.getElementById("infos_name").value = project_info.project_name;
        document.getElementById("infos_date").value = project_info.date;
        document.getElementById("infos_client").value = project_info.client;
        document.getElementById("infos_status").value = project_info.status;

        document.getElementById("add_new_quotation").onclick = function() {
            window.localStorage.setItem("add_quotation", "true");
            window.location.href = "infos_quotations.html";
        };
    }
    else {
        window.location.href = "search_clients.html";
    }
};