'use strict';

module.exports = {
  env: 'test',
  db: 'mongodb://localhost/api-jwt-test',
  port: process.env.PORT || 4100,
  jwtTokenLifeInSeconds: 86400, // expires in 24 hours
  jwtTokenSecret: '$ourdoughCreek'
};
