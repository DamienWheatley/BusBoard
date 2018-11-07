// const RunBusTimes = require('./BusTimes.js')
// const RunBusStopLocator = require('./BusStopLocator.js')
const express = require('express');
const app = express();
const port = 3000;

app.get('/departureBoards', (req, res) => res.send(`
<!DOCTYPE html>
<html lang="eu">
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="style.css">
    <title>BusBoard</title>
    <script src="https://github.com/DamienWheatley/BusBoard/blob/master/BusStopLocator.js"></script>
</head>
<body>
    <h1>BusBoard - Coming Soon!</h1>
    <p>Enter the Postcode and then click "Submit":</p>
    <form id="frm1" action="/action_page.php">
        Postcode: <input type="text" name="fPostcode"><br>
        <input type="button" onclick="runProgram" value="Submit">
    </form>
    
</body>
</html>
`));

//http://localhost:3000/departureBoards
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

