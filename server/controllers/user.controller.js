const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');

const User = require('../models/user.model');

const userSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email(),
  password: Joi.string().required(),
  repeatPassword: Joi.string().required().valid(Joi.ref('password'))
})

async function insert(user) {
  valid = await userSchema.validate(user);
  if (valid.value) {
    user.hashedPassword = bcrypt.hashSync(user.password, 10);
    delete user.password;
    return await new User(user).save();
  }
}

module.exports = {
  insert
}
