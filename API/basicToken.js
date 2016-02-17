// This is the token
var TOKEN = "MADERA";

// Very Basic auth with a token
module.exports = function (token) {

    if(token == TOKEN) return true;

    return false;
};