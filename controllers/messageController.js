const Message = require('../models/Message');
const User = require('../models/User');

exports.getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, recipient: req.params.userId },
        { sender: req.params.userId, recipient: req.user.id }
      ]
    })
      .sort('createdAt')
      .populate('sender', 'name profilePicture')
      .populate('recipient', 'name profilePicture');

    res.status(200).json({
      success: true,
      data: messages
    });
  } catch (err) {
    next(err);
  }
};

exports.createMessage = async (req, res, next) => {
  try {
    const { recipient, content } = req.body;

    const message = await Message.create({
      sender: req.user.id,
      recipient,
      content
    });

    res.status(201).json({
      success: true,
      data: message
    });
  } catch (err) {
    next(err);
  }
};

exports.updateMessageStatus = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: message
    });
  } catch (err) {
    next(err);
  }
};
