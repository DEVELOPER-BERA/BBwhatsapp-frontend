const Message = require('../models/Message');
const User = require('../models/User');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.userId}`);

    // Join user's personal room
    socket.join(socket.userId);

    // Handle new messages
    socket.on('sendMessage', async ({ recipient, content }) => {
      try {
        const message = await Message.create({
          sender: socket.userId,
          recipient,
          content,
          status: 'sent'
        });

        // Emit to recipient
        io.to(recipient).emit('newMessage', message);

        // Confirm to sender
        socket.emit('messageSent', message);
      } catch (err) {
        console.error(err);
      }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.userId}`);
    });
  });
};
