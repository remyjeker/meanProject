const User = require('../models/user.model');

module.exports = {
  listAll
}

async function listAll() {
  return await User.find();
}
