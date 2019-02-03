const express = require('express');
const app = express();
const db = require('./db');
global.__root   = __dirname + '/';
const httpStatus = require('./lib/httpStatus')
var bodyParser = require('body-parser')

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

app.get('/api/v1', function (req, res) {
  res.status(httpStatus.OK).send('API v1 running');
});

var UserController = require(__root + 'controllers/UserController');
app.use('/api/v1/users', UserController);

const AuthController = require(__root + 'controllers/AuthController');
app.use('/api/v1/authentication', AuthController);

module.exports = app;
