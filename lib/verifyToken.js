const jwtModule = require('./jwtModule')
const httpStatus = require('../lib/httpStatus');

function verifyToken(req, res, next) {
  const audience = req.query.application
  if (!audience) {
    return res.status(httpStatus.FORBIDDEN).send({
      auth: false, message: 'Missing application in query parameters' });
  }
  const token = jwtModule.parseTokenFromAuthorizationHeader(req)
  if (token) {
    const verifyResult = jwtModule.verify(token, {audience})
    if (verifyResult && verifyResult.id) {
      req.userId = verifyResult.id;
      next();
    } else {
      return res.status(httpStatus.FORBIDDEN).send('Bearer token failed verification');
    }
  } else {
    return res.status(httpStatus.FORBIDDEN).send('Bearer token not provided as expected in authorization header');
  }
}
module.exports = verifyToken;
