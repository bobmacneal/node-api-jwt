var httpStatus = {};

httpStatus[exports.OK = 200] = 'OK';
httpStatus[exports.CREATED = 201] = 'Created';
httpStatus[exports.ACCEPTED = 202] = 'Accepted';
httpStatus[exports.NO_CONTENT = 204] = 'No Content';
httpStatus[exports.BAD_REQUEST = 400] = 'Bad Request';
httpStatus[exports.UNAUTHORIZED = 401] = 'Unauthorized';
httpStatus[exports.FORBIDDEN = 403] = 'Forbidden';
httpStatus[exports.NOT_FOUND = 404] = 'Not Found';
httpStatus[exports.INTERNAL_SERVER_ERROR = 500] = 'Server Error';

exports.getStatusText = function(statusCode) {
  if (httpStatus.hasOwnProperty(statusCode)) {
    return httpStatus[statusCode];
  } else {
    throw new Error('Status not yet included in httpStatus dictionary: ' + statusCode);
  }
};
