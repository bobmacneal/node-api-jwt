const express = require('express');
const router = express.Router();
const httpStatus = require('../lib/httpStatus');
const verifyToken = require('../lib/verifyToken');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/index');

router.post('/login', function(req, res) {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(`Server error: ${err.message}`);
    if (!user) return res.status(httpStatus.NOT_FOUND).send(`User not found. email: ${req.body.email}`);

    // check if the password is valid
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(httpStatus.UNAUTHORIZED).send({ auth: false, token: null });

    // if user is found and password is valid
    // create a token
    const token = jwt.sign({ id: user._id }, config.jwtTokenSecret, {
      expiresIn: 86400 // expires in 24 hours
    });

    // return the information including token as JSON
    res.status(httpStatus.OK).send({ auth: true, token: token });
  });
});

router.post('/register', function(req, res) {

  const hashedPassword = bcrypt.hashSync(req.body.password, 8);

  User.create({
      name : req.body.name,
      email : req.body.email,
      password : hashedPassword
    },
    function (err, user) {
      if (err) return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(`Server error: ${err.message}`);

      // if user is registered without errors
      // create a token
      const token = jwt.sign({ id: user._id }, config.jwtTokenSecret, {
        expiresIn: config.jwtTokenLifeInSeconds // expires in 24 hours
      });

      res.status(httpStatus.OK).send({ auth: true, token: token });
    });

});

router.get('/me', verifyToken, function(req, res, next) {

  User.findById(req.userId, { password: 0 }, function (err, user) {
    if (err) return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(`Server error: ${err.message}`);
    if (!user) return res.status(httpStatus.NOT_FOUND).send(`User not found. _id: ${req.userId}`);
    res.status(httpStatus.OK).send(user);
  });

});

module.exports = router;
