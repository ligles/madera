var initPage = function() {

    var project_id = window.localStorage.getItem("project_id");
    var project_add = window.localStorage.getItem("add_project");

    if(project_add != null && project_add == "true") {
        // Hide the loading bar
        try {
            document.getElementsByClassName('load-bar')[0].style.display = "none";
        }
        catch (ex) {}

        document.getElementById("infos_id").innerText = "\"Nouveau\"";
        document.getElementById("modify").innerText = "AJOUTER";
        document.getElementById("infos_status").value = "EN ATTENTE";

        var client_id = window.localStorage.getItem("client_id");
        var first_name =  window.localStorage.getItem("first_name");
        var last_name =  window.localStorage.getItem("last_name");

        if(client_id != null && client_id != "") {
            document.getElementById("infos_client").value = client_id;
            document.getElementById("infos_status").value = "ATTENTE";

            var date = new Date();
            var day = date.getDate().toString();
            if(day.length < 2) day = "0" + day;
            var month = (date.getMonth() + 1).toString();


            if(month.length < 2) month = "0" + month;
            document.getElementById("infos_date").value = day + "/" + month + "/" + date.getFullYear();

            document.getElementById("modify").onclick = function() {




                var project_name = document.getElementById("infos_name").value;
                var date = document.getElementById("infos_date").value;
                var status = document.getElementById("infos_status").value;

                if(project_name == "") {
                    alert("Veuillez renseigner le champs \"Nom\"");
                    return;
                }

                var params =
                    "project_name=" + project_name +
                    "&first_name=" + first_name +
                    "&last_name=" + last_name +
                    "&date=" + date +
                    "&client=" + client_id +
                    "&status=" + status;

                ajax(
                    "POST",
                    "projects",
                    params,
                    function(result) {
                       // alert("Ajout effectué! " + result);

                        window.localStorage.setItem("search_project", project_name);
                        window.localStorage.setItem("projet_id", null);
                        window.localStorage.setItem("add_project", null);

                        window.location.href = "search_projects_results.html";
                    },
                    function(status, text) {
                        alert("Erreur lors de l'ajout! " + text);
                    }
                );
            }
        }
        else {
            window.location.href = "search_projects.html";
        }

    }
    else if(project_id != null && project_id != "") {

        document.getElementById("modify").innerText = "MODIFIER";
        document.getElementById("quotations_part").style.display = "block";
        document.getElementsByClassName("separationLine")[1].style.display = "block";

        ajax(
            "GET/ID",
            "projects",
            project_id,
            function(project_info) {

                document.getElementById("infos_id").innerText = "N°" + project_info.id;
                document.getElementById("infos_name").value = project_info.project_name;
                document.getElementById("infos_date").value = project_info.date;
                document.getElementById("infos_client").value = project_info.id_client;
                document.getElementById("first_name_client").value = project_info.first_name;
                document.getElementById("last_name_client").value = project_info.last_name;
                document.getElementById("infos_status").value = project_info.status;

                    project_info.quotations_list.forEach(function(quotation) {


                    var div = document.createElement('div');
                    div.setAttribute('class', 'one_search_result');
                    div.setAttribute('id', quotation.id);



                    var span_name = document.createElement('span');
                    span_name.innerText = "-> " + quotation.project_name;

                    var span_id = document.createElement('span');
                    span_id.innerText = "N°" + quotation.id;

                    var span_statut = document.createElement('span');
                    span_statut.innerText = quotation.status;

                    div.appendChild(span_name);
                    div.appendChild(span_id);
                    div.appendChild(span_statut);

                    document.getElementById("quotations_list").appendChild(div);

                    div.onclick = function(evt)
                    {
                        window.localStorage.setItem("quotation_id", quotation.id);
                        window.localStorage.setItem("add_quotation", null);

                        window.location.href = "infos_quotations.html"
                    }
                });

                document.getElementById("add_new_quotation").onclick = function() {
                    window.localStorage.setItem("add_quotation", "true");

                    window.localStorage.setItem("project_name", document.getElementById("infos_name").value);

                    window.location.href = "infos_quotations.html";
                };

                document.getElementById("modify").onclick = function() {

                    var name = document.getElementById("infos_name").value;
                    var status = document.getElementById("infos_status").value;

                    if(name == "") {
                        alert("Veuillez renseigner un nom.");
                        return;
                    }

                    var params =
                        "id=" + project_id +
                        "&name=" + name +
                        "&status=" + status;

                    ajax(
                        "UPDATE",
                        "projects",
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
        );
    }
    else {
        window.location.href = "search_projects.html";
    }
};