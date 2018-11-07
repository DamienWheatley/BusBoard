const express = require('express');
const app = express();
const port = 3000;

app.get('/departureBoards', (req, res) => res.send('Hello World!'));
//http://localhost:3000/departureBoards
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

