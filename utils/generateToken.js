// src/utils/generateToken.js
const jwt = require('jsonwebtoken');
const config = require('../config/db');

module.exports = (userId) => {
  return jwt.sign({ id: userId }, config.jwtSecret, {
    expiresIn: config.jwtExpire
  });
};
