const express = require('express');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const messageRoutes = require('./messageRoutes');

const router = express.Router();

router.use('/api/auth', authRoutes);
router.use('/api/users', userRoutes);
router.use('/api/messages', messageRoutes);

module.exports = router;
