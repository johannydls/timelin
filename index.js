const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send({message:"Welcome to the Timelin API"});
});

app.use(cors());
app.use(express.json());
app.use(require('./app/routes.js'));

const port = process.env.PORT || 3005

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});