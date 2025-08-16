const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const messageController = require('../controllers/messageController');

// Apply protection middleware to all routes
router.use(protect);

// Get messages between users
router.get('/:userId', messageController.getMessages);

// Create new message
router.post('/', messageController.createMessage);

// Update message status
router.put('/:id/status', messageController.updateMessageStatus);

module.exports = router;
