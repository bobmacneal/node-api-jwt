var express = require('express');
var router = express.Router();
// var bodyParser = require('body-parser');
const httpStatus = require('../httpStatus');

var VerifyToken = require('./VerifyToken');

// router.use(bodyParser.urlencoded({ extended: false }));
// router.use(bodyParser.json());
var User = require('../user/User');

/**
 * Configure JWT
 */
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
var config = require('../env.config'); // get config file

router.post('/login', function(req, res) {

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(`Server error: ${err.message}`);
    if (!user) return res.status(httpStatus.NOT_FOUND).send(`User not found. email: ${req.body.email}`);

    // check if the password is valid
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(httpStatus.UNAUTHORIZED).send({ auth: false, token: null });

    // if user is found and password is valid
    // create a token
    var token = jwt.sign({ id: user._id }, config.jwtTokenSecret, {
      expiresIn: 86400 // expires in 24 hours
    });

    // return the information including token as JSON
    res.status(httpStatus.OK).send({ auth: true, token: token });
  });

});

router.post('/register', function(req, res) {

  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  User.create({
      name : req.body.name,
      email : req.body.email,
      password : hashedPassword
    },
    function (err, user) {
      if (err) return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(`Server error: ${err.message}`);

      // if user is registered without errors
      // create a token
      var token = jwt.sign({ id: user._id }, config.jwtTokenSecret, {
        expiresIn: 86400 // expires in 24 hours
      });

      res.status(httpStatus.OK).send({ auth: true, token: token });
    });

});

router.get('/me', VerifyToken, function(req, res, next) {

  User.findById(req.userId, { password: 0 }, function (err, user) {
    if (err) return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(`Server error: ${err.message}`);
    if (!user) return res.status(httpStatus.NOT_FOUND).send(`User not found. _id: ${req.userId}`);
    res.status(httpStatus.OK).send(user);
  });

});

module.exports = router;
