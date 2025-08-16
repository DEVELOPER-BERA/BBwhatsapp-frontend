const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authenticateSocket = async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error('Authentication error: No token provided'));
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new Error('Authentication error: User not found'));
    }

    // Attach user to socket
    socket.userId = user._id;
    next();
  } catch (err) {
    next(new Error('Authentication error: Invalid token'));
  }
};
