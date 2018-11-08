const readline = require('readline-sync');
const got = require('got');
const importClass = require('./Classes.js');

const appId = "f771fea0";
const appKey = "0cf6215d5205ab47fc9f726c0b6221b0";

//Retrieves information from URL and stores it in an array.

function getUserPostcode () {
    // console.log("Please enter your Postcode without spaces");
    var postcode = "NW51TL"//readline.prompt();
    return postcode;
}

function createsPostCodeURL(input) {
    const url = "api.postcodes.io/postcodes/" + input;
    return url;
}

function parsePostcodeURL(url) {
    return got(url, { json: true })
        .then(response => {
            let arrayLonLat = [response.body.result.latitude, response.body.result.longitude];
            return arrayLonLat;
       })
}

function createsLonLatURL(arrayLonLat) {
    const url = "https://api.tfl.gov.uk/StopPoint?stopTypes=NaptanPublicBusCoachTram&radius=300&lat=" + arrayLonLat[0] + "&lon=" + arrayLonLat[1] + "&app_id=" + appId + "&app_key=" + appKey;
    return url;
}

function parseLonLatURL(url) {
    return got(url, { json: true })
        .then(response => {
            var stopPointArray = response.body.stopPoints;
            return stopPointArray;
       })
}

function displayData(stopPointArray) {
    let retrievedData = [];
    // console.log("The nearest bus stop(s) for that postcode are:"); 
    for(i = 0; i <= 1; i++) {
        retrievedData.push(new importClass.BusCodes(stopPointArray[i].commonName, stopPointArray[i].id));
    }
    return retrievedData;
//     if (retrievedData.length > 0) {
//         retrievedData.forEach(function(element) {
//             console.log(element.commonName + " - the unique identifying code for this station is " + element.id + ".");
//         })
//     } else if (retrievedData.length = 0) {
//         console.log("Sorry, there are no bus stops nearby.")
//     }
}

function runProgram() {
    var postCode = getUserPostcode();
    var url = createsPostCodeURL(postCode);

    var output = parsePostcodeURL(url)
        .then(arrayLonLat => {
            var LonLatURL = createsLonLatURL(arrayLonLat);
            return LonLatURL;
        })
        .then(LonLatURL => {
            var stopPointArray = parseLonLatURL(LonLatURL);
            return stopPointArray;
        })
        .then(stopPointArray => {
            var retrievedData = displayData(stopPointArray);
            return retrievedData;
        })
    return output;   
}

// runProgram();

exports.RunBusStopLocator = runProgram;