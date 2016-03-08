// This is the token
var config = require('config');
var TOKEN = config.api.token;

// Very Basic auth with a token
module.exports = function (token) {

    if(token == TOKEN) return true;

    return false;
};