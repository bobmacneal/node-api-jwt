'use strict';

module.exports = {
  env: 'test',
  db: 'mongodb://localhost/node-api-jwt-test',
  port: process.env.PORT || 4100,
  jwtIssuer: 'www.yourdomainname.com',
  jwtExpires: 86400 // Numeric seconds expiry (86400 = '1d'). If string supplied, you provide units (e.g., "8h")
};
