const BusTimes = require('./BusTimes.js')
const BusStops = require('./BusStopLocator.js')
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('frontend'));

app.get('/busstops', (req, res) => {
    BusStops.RunBusStopLocator()
        .then(busstops => {
            res.send(busstops)
        })
}) 

app.get('/busarrivals', (req, res) => {
    BusTimes.runBusTimes()
        .then(buses => {
            res.send(buses)
        })
}) 

//http://localhost:3000/busstops
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

