module.exports = {
  mongoURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/bbwhatsapp',
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_here',
  jwtExpire: process.env.JWT_EXPIRE || '30d'
};
