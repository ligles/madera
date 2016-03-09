var initPage = function() {

    var search_project = window.localStorage.getItem("search_project");

    if(search_project != null && search_project != "") {
        document.getElementById("search_text").innerText = "\"" + search_project + "\"";

        var data = [];

        ajax(
            "GET/SEARCH",
            "projects",
            search_project,
            function(data) {
                data.forEach(function(project) {
                    var div = document.createElement('div');
                    div.setAttribute('class', 'one_search_result');
                    div.setAttribute('id', project.id);

                    var span_first_name = document.createElement('span');
                    span_first_name.innerText =  project.first_name;

                    var span_last_name = document.createElement('span');
                    span_last_name.innerText =  project.last_name;


                    var span_name = document.createElement('span');
                    span_name.innerText = "-> " + project.project_name;

                    var span_id = document.createElement('span');
                    span_id.innerText = "Projet N°" + project.id;

                    var span_date = document.createElement('span');
                    span_date.innerText = project.date;

                    div.appendChild(span_first_name);
                    div.appendChild(span_last_name);
                    div.appendChild(span_name);
                    div.appendChild(span_id);
                    div.appendChild(span_date);

                    document.getElementById("results_list").appendChild(div);
                });

                Array.prototype.forEach.call(document.getElementsByClassName("one_search_result"), function(elem) {
                    elem.onclick = function() {
                        window.localStorage.setItem("project_id", elem.id);
                        window.localStorage.setItem("add_project", null);

                        window.location.href = "infos_projects.html"
                    }
                });
            }
        );
    }
    else {
        window.location.href = "search_projects.html";
    }
};