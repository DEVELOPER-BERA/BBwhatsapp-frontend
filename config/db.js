module.exports = {
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/bbwhatsapp',
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
    jwtExpire: process.env.JWT_EXPIRE || '30d'
};
