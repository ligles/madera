var initPage = function() {

    document.getElementById("search_go").onclick = function() {
        var value = document.getElementById("search_content").value;

        if(value != null && value != "") {
            window.localStorage.setItem("search_project", value);
            window.localStorage.setItem("projet_id", null);
            window.localStorage.setItem("add_project", null);

            window.location.href = "search_projects_results.html";
        }
        else {
            alert('Champs de recherche vide.');
        }
    };
};