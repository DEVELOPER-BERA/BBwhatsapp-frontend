const Message = require('../models/Message');
const User = require('../models/User');

// Handle socket connections
exports.handleConnection = (io, socket) => {
  console.log(`New client connected: ${socket.id}`);

  // Join user to their own room
  socket.on('join', async (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined`);

    // Update user status to online
    await User.findByIdAndUpdate(userId, { online: true });
    io.emit('userStatus', { userId, online: true });
  });

  // Handle new messages
  socket.on('sendMessage', async (message) => {
    try {
      // Save message to database
      const newMessage = await Message.create({
        sender: message.sender,
        recipient: message.recipient,
        content: message.content,
        status: 'sent'
      });

      // Populate sender info
      const populatedMessage = await Message.findById(newMessage._id)
        .populate('sender', 'name profilePicture');

      // Emit to recipient
      io.to(message.recipient).emit('receiveMessage', populatedMessage);

      // Emit back to sender for confirmation
      io.to(message.sender).emit('messageSent', populatedMessage);

      // Update status to delivered after a short delay
      setTimeout(async () => {
        await Message.findByIdAndUpdate(newMessage._id, { status: 'delivered' });
        io.to(message.sender).emit('messageStatus', {
          messageId: newMessage._id,
          status: 'delivered'
        });
      }, 1000);
    } catch (err) {
      console.error('Error sending message:', err);
    }
  });

  // Handle message read status
  socket.on('markAsRead', async ({ messageId, userId }) => {
    try {
      const message = await Message.findByIdAndUpdate(
        messageId,
        { status: 'read' },
        { new: true }
      );

      if (message) {
        io.to(message.sender.toString()).emit('messageStatus', {
          messageId: message._id,
          status: 'read'
        });
      }
    } catch (err) {
      console.error('Error marking message as read:', err);
    }
  });

  // Handle typing indicator
  socket.on('typing', ({ recipient, isTyping }) => {
    io.to(recipient).emit('typing', {
      sender: socket.userId,
      isTyping
    });
  });

  // Handle disconnect
  socket.on('disconnect', async () => {
    console.log(`Client disconnected: ${socket.id}`);

    if (socket.userId) {
      // Update user status to offline
      await User.findByIdAndUpdate(socket.userId, {
        online: false,
        lastSeen: Date.now()
      });
      io.emit('userStatus', { userId: socket.userId, online: false });
    }
  });
};
