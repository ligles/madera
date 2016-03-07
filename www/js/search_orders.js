var initPage = function() {

    document.getElementById("search_go").onclick = function() {
        var value = document.getElementById("search_content").value;

        console.log(value);

        if(value != null && value != "") {
            window.localStorage.setItem("search_order", value);
            window.localStorage.setItem("order_id", null);
            window.localStorage.setItem("add_order", null);

            window.location.href = "search_orders_results.html";
        }
        else {
            alert('Champs de recherche vide.');
        }
    };
};