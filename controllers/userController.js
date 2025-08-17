const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } }).select('-password');
    res.send(users);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
