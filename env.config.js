module.exports = {
  'mongoDbConnectionString': 'mongodb://localhost/jwt-test',
  'localHostPort': 4000,
  'jwtRefreshTokenLifeInSeconds': 86400,
  'jwtRefreshTokenSecret': '$tory-$treet',
  'jwtTokenLifeInSeconds': 36000,
  'jwtTokenSecret': '$ourdoughCreek',
  'permissionLevels': {
    'participant': 0,
    'admin': 2048
  }
};
