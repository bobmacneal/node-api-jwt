const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config = require('../env.config'); // get our config file
const httpStatus = require('../httpStatus');


function verifyToken(req, res, next) {

  const token = req.headers['authorization'].split(' ')[1]
  if (!token)
    return res.status(httpStatus.FORBIDDEN).send({ auth: false, message: 'JWT not provided.' });

  jwt.verify(token, config.jwtTokenSecret, function(err, decoded) {

    if (err) {
      switch(err.name) {
        case 'TokenExpiredError':
          return res.status(httpStatus.FORBIDDEN).send({
            auth: false, message: `Token error: ${err.message} at ${err.expiredAt}` })
        case 'JsonWebTokenError':
          return res.status(httpStatus.FORBIDDEN).send({
            auth: false, message: `Token error: ${err.message}` })
        case 'NotBeforeError':
          return res.status(httpStatus.FORBIDDEN).send({
            auth: false, message: `Token error: ${err.message} until ${err.date}` })
        case 'SyntaxError':
          return res.status(httpStatus.FORBIDDEN).send({
            auth: false, message: `Token error: ${err.message}` })
        default:
          return res.status(httpStatus.FORBIDDEN).send({
            auth: false, message: err.message })
      }
    }

    // if everything is good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });

}

module.exports = verifyToken;
