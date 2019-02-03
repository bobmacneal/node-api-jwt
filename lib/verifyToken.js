const config = require('../config/index');
const httpStatus = require('./httpStatus');
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const authorizationHeader = req.headers['authorization']
  if (!authorizationHeader || !authorizationHeader.includes('Bearer ') ) {
    return res.status(httpStatus.FORBIDDEN).send({
      auth: false, message: 'JWT not provided as expected in authorization header' });
  }
  const token = req.headers['authorization'].split(' ')[1]

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

    // Save to request to provide for use in other routes
    req.userId = decoded.id;
    next();
  });

}

module.exports = verifyToken;
