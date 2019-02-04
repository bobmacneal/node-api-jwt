'use strict';

module.exports = {
  env: 'production',
  db: process.env.MONGOHQ_URL || process.env.MONGODB_URI,
  port: process.env.PORT || 4000,
  jwtTokenLifeInSeconds: 86400, // expires in 24 hours
  jwtTokenSecret: '$ourdoughCreek',

  jwtIssuer: 'www.grokearth.com',
  jwtExpires: 86400 // Numeric seconds count (86400 = '1d'). If string, provide units ("10h")
};
