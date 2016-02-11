var initPage = function() {

    document.getElementById("search_go").onclick = function() {
        var value = document.getElementById("search_content").value;

        if(value != null && value != "") {
            window.localStorage.setItem("search_quotation", value);
            window.localStorage.setItem("quotation_id", null);
            window.localStorage.setItem("add_quotation", null);

            window.location.href = "search_quotations_results.html";
        }
    };

    //document.getElementById("add_new").onclick = function() {
    //    window.localStorage.setItem("search_project", null);
    //    window.localStorage.setItem("projet_id", null);
    //    window.localStorage.setItem("add_project", true);
    //
    //    window.location.href = "infos_projects.html";
    //};
};