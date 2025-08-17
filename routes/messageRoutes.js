const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const messageController = require('../controllers/messageController');

router.get('/:userId', auth, messageController.getMessages);

module.exports = router;
