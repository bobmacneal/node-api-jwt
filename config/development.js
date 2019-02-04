'use strict';

module.exports = {
  env: 'development',
  db: 'mongodb://localhost/node-api-jwt',
  port: process.env.PORT || 4000,
  jwtIssuer: 'www.yourdomainname.com',
  jwtExpires: 86400 // Numeric seconds expiry (86400 = '1d'). If string supplied, you provide units (e.g., "8h")
};
