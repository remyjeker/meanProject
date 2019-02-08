const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const usersCtrl = require('../controllers/users.controller');

const router = express.Router();
module.exports = router;

// Must be logged in to fetch users list
router.use(passport.authenticate('jwt', { session: false }));

router.route('/').get(asyncHandler(listAllUsers));

async function listAllUsers(req, res) {
  let usersList = await usersCtrl.listAll();
  res.json(usersList);
};
