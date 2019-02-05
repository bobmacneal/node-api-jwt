const express = require('express');
const app = express();
require('./db');
global.__root   = __dirname + '/';
const httpStatus = require('./lib/httpStatus')
const bodyParser = require('body-parser')

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

app.get('/api/v1', function (req, res) {
  res.status(httpStatus.OK).send('API v1 running');
});

const userController = require(__root + 'controllers/userController');
app.use('/api/v1/users', userController);

const authController = require(__root + 'controllers/authController');
app.use('/api/v1/authentication', authController);

module.exports = app;
