'use strict';

module.exports = {
  env: 'test',
  db: 'mongodb://localhost/api-jwt-test',
  port: process.env.PORT || 4100,
  jwtTokenLifeInSeconds: 86400, // expires in 24 hours
  jwtTokenSecret: '$ourdoughCreek',

  jwtIssuer: 'www.grokearth.com',
  jwtExpires: 86400 // Numeric seconds count (86400 = '1d'). If string, provide units ("10h")
};
