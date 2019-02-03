module.exports = {
  'mongoDbConnectionString': 'mongodb://localhost/jwt-test',
  'localHostPort': 4000,
  'jwtTokenLifeInSeconds': 86400,
  'jwtTokenSecret': '$ourdoughCreek',
  'permissionLevels': {
    'participant': 0,
    'admin': 2048
  }
};
