var initPage = function() {

    document.getElementById("search_go").onclick = function() {
        var value = document.getElementById("search_content").value;

        if(value != null && value != "") {
            window.localStorage.setItem("search_quotation", value);
            window.localStorage.setItem("quotation_id", null);
            window.localStorage.setItem("add_quotation", null);

            window.location.href = "search_quotations_results.html";
        }
        else {
            alert('Champs de recherche vide.');
        }
    };
};