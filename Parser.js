const got = require('got');
// const logger = log4js.getLogger('<filename>');

//Retrieves information from URL and stores it in an array.

function parseURL(callback,url) {
    var array = [];
    got(url, { json: true })
        .then(response => {
            array = response.body;
            callback(array);
        })
}

exports.parseURL = parseURL;