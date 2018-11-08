const got = require('got');
// const logger = log4js.getLogger('<filename>');

//Retrieves information from URL and stores it in an array.

function parseURL(url) {
    return got(url, { json: true })
        .then(response => {
            var array = [];
            array = response.body;
            return array;
        })
}

exports.parseURL = parseURL;