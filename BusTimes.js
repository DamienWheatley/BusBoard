const readline = require('readline-sync');
const importParse = require('./Parser.js');
const importClass = require('./Classes.js');
const moment = require('moment');
// const BusLocator = require('./BusStopLocator.js');

const appId = "f771fea0";
const appKey = "0cf6215d5205ab47fc9f726c0b6221b0";

function userInput() {
    var userInput = "490008660N"//readline.prompt();
    return userInput;
}

function createsArrivalsURL(input) {
    const url = "https://api.tfl.gov.uk/StopPoint/" + input + "/Arrivals";
    return url;
}

//Filters information for user inputted Bus Code
function filteringData(array) {
    let retrievedData = [];
    let numberOfBuses = Math.min(array.length,5);
    for(i = 0; i <= numberOfBuses - 1; i++) {
        retrievedData.push(new importClass.BusArrival(array[i].vehicleId,array[i].timeToStation,array[i].lineName,array[i].towards))
    }
    return retrievedData
}

function convertTime (retrievedData){
    if (retrievedData.length > 0) {
        retrievedData.sort(sortData);
        retrievedData.forEach(function(element) {
        moment().add(element.timeToStation,"seconds").fromNow()})
    }
    return retrievedData
}

function sortData(bus1,bus2) {
    if (bus1.timeToStation < bus2.timeToStation) {
        return -1;
    } else if (bus1.timeToStation > bus2.timeToStation) {
        return 1;
    } else {
        return 0;
    }
}

function runBusTimesProgram() {
    var busCode = userInput();
    var url = createsArrivalsURL(busCode);

    var output = importParse.parseURL(url)
        .then(array => {
            var retrievedData = filteringData(array);
            return retrievedData;
        })
        .then(retrievedData => {
            var retrievedData = convertTime(retrievedData)
            return retrievedData;
        })
    return output;
}

exports.runBusTimes = runBusTimesProgram;