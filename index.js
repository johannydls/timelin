const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send({message:"Hello World"});
});

app.use(cors());
app.use(express.json());
app.use(require('./app/routes.js'));

app.listen(3005, () => {
    console.log("Listening on http://localhost:3005");
});