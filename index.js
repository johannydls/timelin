const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');

var jwt = require('jsonwebtoken');

const app = express();

app.set('secretKey', 'TiM3L1n');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send({message:"Welcome to the Timelin API"});
});

function validateUser(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
        if (err) {
            res.json({status:"error", message: err.message, data:null});
        } else {
            // add user id to request
            req.body.userId = decoded.id;
            next();
        }
    });
}


app.use(cors());
app.use(express.json());
app.use(require('./app/routes.js'));

const port = process.env.PORT || 3005

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});