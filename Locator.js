const readline = require('readline-sync');
const got = require('got');
const importClass = require('./BusArrival.js');

//Retrieves information from URL and stores it in an array.

function getUserPostcode () {
    console.log("Please enter your Postcode without spaces");
    var postcode = readline.prompt();
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
       .then(arrayLonLat => {
           var LonLatURL = createsLonLatURL(arrayLonLat);
           return LonLatURL;
       })
       .then(LonLatURL => {
            var stopPointArray = parseLonLatURL(LonLatURL);
            return stopPointArray;
       })
        .then(stopPointArray => {
            filteringData(stopPointArray);
        })
    }

function createsLonLatURL(arrayLonLat) {
    const url = "https://api-radon.tfl.gov.uk/StopPoint?stopTypes=NaptanPublicBusCoachTram&radius=300&lat=" + arrayLonLat[0] + "&lon=" + arrayLonLat[1];
    return url;
}

function parseLonLatURL(url) {
    return got(url, { json: true })
        .then(response => {
            // console.log(response);
            var stopPointArray = response.body.stopPoints;
            return stopPointArray;
       })
}

function filteringData(stopPointArray) {
    let retrievedData = [];
    // console.log(array);
    console.log("The nearest bus stop(s) for that postcode are:"); 
    for(i = 0; i <= stopPointArray.length - 1; i++) {
        retrievedData.push(new importClass.BusCodes(stopPointArray[i].indicator, stopPointArray[i].commonName, stopPointArray[i].id));
    }
    if (retrievedData.length > 0) {
        retrievedData.forEach(function(element) {
            console.log(element.commonName + " - the unique identifying code for this station is " + element.id + ".");
        })
    } else if (retrievedData.length = 0) {
        console.log("Sorry, there are no bus stops nearby.")
    }
    // console.log(retrievedData);
}

function runProgram() {
    var postCode = getUserPostcode();
    var url = createsPostCodeURL(postCode);
    let promise = new Promise(function() {
        parsePostcodeURL(url);
        return url;
        })
        promise.then(arrayLonLat => {
            var LonLatURL = createsLonLatURL(arrayLonLat);
            return LonLatURL;
        })
        .then(LonLatURL => {
            var stopPointArray = parseLonLatURL(LonLatURL);
            return stopPointArray;
        })
        .then(stopPointArray => {
            filteringData(stopPointArray);
        })
}
runProgram()