const express = require('express');
const authRoutes = require('./auth.route');
const userRoutes = require('./user.route');
const usersRoutes = require('./users.route');

const router = express.Router();

router.get('/health-check', (req, res) => res.send('OK'));

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/users', usersRoutes);

module.exports = router;
