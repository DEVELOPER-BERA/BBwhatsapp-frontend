const express = require('express');
const { protect } = require('../middleware/auth');
const {
  getUsers,
  getMe,
  updateProfile
} = require('../controllers/userController');

const router = express.Router();

router.use(protect);

router.get('/', getUsers);
router.get('/me', getMe);
router.put('/me', updateProfile);

module.exports = router;
