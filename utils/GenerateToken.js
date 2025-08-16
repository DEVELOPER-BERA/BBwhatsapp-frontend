const jwt = require('jsonwebtoken');
const config = require('../config/db');

exports.generateToken = (userId) => {
    return jwt.sign({ id: userId }, config.jwtSecret, {
        expiresIn: config.jwtExpire
    });
};
