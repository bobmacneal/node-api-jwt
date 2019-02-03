'use strict';

module.exports = {
  env: 'development',
  db: 'mongodb://localhost/api-jwt',
  port: process.env.PORT || 4000,
  jwtTokenLifeInSeconds: 86400, // expires in 24 hours
  jwtTokenSecret: '$ourdoughCreek'
};
