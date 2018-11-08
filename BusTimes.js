const readline = require('readline-sync');
const importParse = require('./Parser.js');
const importClass = require('./Classes.js');
const moment = require('moment');
// const BusLocator = require('./BusStopLocator.js');

const appId = "f771fea0";
const appKey = "0cf6215d5205ab47fc9f726c0b6221b0";

function userInput() {
    console.log("Please enter the bus code:");
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
    if (retrievedData.length > 0) {
        retrievedData.sort(sortData);
        retrievedData.forEach(function(element) {
        console.log("Arriving " + moment().add(element.timeToStation,"seconds").fromNow() + " is bus " + element.lineName + " towards " + element.towards + " with vehicle id " + element.vehicleId )
        })
    } else {
        console.log("There was no information for that bus code.");
    }
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
    importParse.parseURL(filteringData,url);
}

runBusTimesProgram()