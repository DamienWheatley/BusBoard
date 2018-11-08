

function getBusStops(){
    var usersPostcode = document.getElementById("postcode").value;
    if (usersPostcode === "") {
        document.getElementById("PCresults").innerHTML = `Please enter a postcode.`;
    } else {
        var xhttp = new XMLHttpRequest();
 
        xhttp.open('GET', 'http://localhost:3000/busstops', true);
     
        xhttp.setRequestHeader('Content-Type', 'application/json');
     
        xhttp.onload = function() {
        // Handle response here using e.g. xhttp.status, xhttp.response, xhttp.responseText
            // console.log(xhttp.response);
            var response = xhttp.response;
            var parsedResponse = JSON.parse(response);
            document.getElementById("PCresults").innerHTML = `The closest bus stops for ${usersPostcode} are:`;
            document.getElementById("busStops").innerHTML = parsedResponse[0].commonName + "-----" +parsedResponse[0].id;
            document.getElementById("busStops2").innerHTML = parsedResponse[0].commonName + "-----" +parsedResponse[0].id;
            console.log(response)
        } 
        xhttp.send();
    }   
}

function getBusArrivals(){

    var x = document.getElementById("busStopCode").value;
    if (x === "") {
        document.getElementById("busArrival").innerHTML = `Please enter a bus stop ID.`;
    } else {
        var xhttp = new XMLHttpRequest();
 
        xhttp.open('GET', 'http://localhost:3000/busarrivals', true);
     
        xhttp.setRequestHeader('Content-Type', 'application/json');
     
        xhttp.onload = function() {
        // Handle response here using e.g. xhttp.status, xhttp.response, xhttp.responseText
            console.log(xhttp.response);
            var y = xhttp.response;
            // var z = JSON.parse(y);
            document.getElementById("busArrival").innerHTML = `The next 5 arrivals for ${x} are:`;
            document.getElementById("buses").innerHTML = z
            console.log(y)
        } 
        xhttp.send();
    }   
}