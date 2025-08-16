const express = require('express');
const { protect } = require('../middleware/auth');
const {
  getMessages,
  createMessage,
  updateMessageStatus
} = require('../controllers/messageController');

const router = express.Router();

router.use(protect);

router.get('/:userId', getMessages);
router.post('/', createMessage);
router.put('/:id/status', updateMessageStatus);

module.exports = router;
