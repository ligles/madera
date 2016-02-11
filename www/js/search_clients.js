var initPage = function() {

    document.getElementById("search_go").onclick = function() {
        var value = document.getElementById("search_content").value;

        if(value != null && value != "") {
            window.localStorage.setItem("search_client", value);
            window.localStorage.setItem("client_id", null);
            window.localStorage.setItem("add_client", null);

            window.location.href = "search_clients_results.html";
        }
    };

    document.getElementById("add_new").onclick = function() {
        window.localStorage.setItem("search_client", null);
        window.localStorage.setItem("client_id", null);
        window.localStorage.setItem("add_client", true);

        window.location.href = "infos_clients.html";
    };
};