const Message = require('../models/Message');

exports.getMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: userId },
        { sender: userId, receiver: req.user._id }
      ]
    }).sort('timestamp');
    
    res.send(messages);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
