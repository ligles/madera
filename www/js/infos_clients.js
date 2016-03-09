var initPage = function() {

    var client_id = window.localStorage.getItem("client_id");
    var client_add = window.localStorage.getItem("add_client");

    if(client_add != null && client_add == "true") {

        document.getElementById("infos_id").innerText = "\"Nouveau\"";
        document.getElementById("modify").innerText = "AJOUTER";

        document.getElementById("modify").onclick = function() {

            var first_name = document.getElementById("infos_first_name").value;
            var last_name = document.getElementById("infos_last_name").value;
            var birth_date = document.getElementById("infos_birth_date").value;

            if(last_name == "") {
                alert("Veuillez renseigner le champs \"Nom\"");
                return;
            }
            if(first_name == "") {
                alert("Veuillez renseigner le champs \"Prénom\"");
                return;
            }
            if(birth_date == "") {
                alert("Veuillez renseigner le champs \"Date de naissance\"");
                return;
            }

            var params =
                "first_name=" + first_name +
                "&last_name=" + last_name +
                "&birth_date=" + birth_date;

            ajax(
                "POST",
                "clients",
                params,
                function(result) {
                    alert("Ajout effectué! " + result);

                    window.localStorage.setItem("search_client", last_name);
                    window.localStorage.setItem("client_id", null);
                    window.localStorage.setItem("add_client", null);

                    window.location.href = "search_clients_results.html";
                },
                function(status, text) {
                    alert("Erreur lors de l'ajout! " + text);
                }
            );
        };
    }
    else if(client_id != null && client_id != "") {

        document.getElementById("modify").innerText = "MODIFIER";
        document.getElementById("projects_part").style.display = "block";
        document.getElementsByClassName("separationLine")[1].style.display = "block";

        ajax(
            "GET/ID",
            "clients",
            client_id,
            function(data) {


                document.getElementById("infos_id").innerText = "N°" + data.id;
                document.getElementById("infos_last_name").value = data.last_name;
                document.getElementById("infos_first_name").value = data.first_name;
                document.getElementById("infos_birth_date").value = data.birth_date;


                    data.projects_list.forEach(function(project) {

                        var div = document.createElement('div');
                        div.setAttribute('class', 'one_search_result');
                        div.setAttribute('id', project.id);

                        var span_name = document.createElement('span');
                        span_name.innerText = "-> " + project.project_name;

                        var span_id = document.createElement('span');
                        span_id.innerText = "N°" + project.id;

                        var span_date = document.createElement('span');
                        span_date.innerText = project.date;

                        div.appendChild(span_name);
                        div.appendChild(span_id);
                        div.appendChild(span_date);

                        document.getElementById("projects_list").appendChild(div);

                        div.onclick = function(evt)
                        {
                            window.localStorage.setItem("project_id", project.id);
                            window.localStorage.setItem("add_project", null);

                            window.location.href = "infos_projects.html";
                        }
                    });

                document.getElementById("add_new_project").onclick = function() {

                    window.localStorage.setItem("add_project", "true");

                    window.localStorage.setItem("first_name", document.getElementById("infos_first_name").value );
                    window.localStorage.setItem("last_name", document.getElementById("infos_last_name").value );

                    window.location.href = "infos_projects.html";
                };

                document.getElementById("modify").onclick = function() {

                    var first_name = document.getElementById("infos_first_name").value;
                    var last_name = document.getElementById("infos_last_name").value;
                    var birth_date = document.getElementById("infos_birth_date").value;

                    if(last_name == "") {
                        alert("Veuillez renseigner le champs \"Nom\"");
                        return;
                    }
                    if(first_name == "") {
                        alert("Veuillez renseigner le champs \"Prénom\"");
                        return;
                    }
                    if(birth_date == "") {
                        alert("Veuillez renseigner le champs \"Date de naissance\"");
                        return;
                    }

                    var params =
                        "id=" + client_id +
                        "&first_name=" + first_name +
                        "&last_name=" + last_name +
                        "&birth_date=" + birth_date;

                    ajax(
                        "UPDATE",
                        "clients",
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
        window.location.href = "search_clients.html";
    }
};