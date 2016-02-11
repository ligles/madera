var initPage = function() {

    var client_id = window.localStorage.getItem("client_id");
    var client_add = window.localStorage.getItem("add_client");

    if(client_add != null && client_add == "true") {

        document.getElementById("infos_id").innerText = "\"Nouveau\"";
        document.getElementById("modify").innerText = "AJOUTER";
    }
    else if(client_id != null && client_id != "") {

        document.getElementById("modify").innerText = "MODIFIER";
        document.getElementById("projects_part").style.display = "block";
        document.getElementsByClassName("separationLine")[1].style.display = "block";

        var client_info = data['customers'][client_id.replace(/^0+/, '')-1];

        document.getElementById("infos_id").innerText = "N°" + client_info.id;
        document.getElementById("infos_last_name").value = client_info.last_name;
        document.getElementById("infos_first_name").value = client_info.first_name;
        document.getElementById("infos_birth_date").value = client_info.birth_date;

        document.getElementById("add_new_project").onclick = function() {
            window.localStorage.setItem("add_project", "true");
            window.location.href = "infos_projects.html";
        };
    }
    else {
        window.location.href = "search_clients.html";
    }
};