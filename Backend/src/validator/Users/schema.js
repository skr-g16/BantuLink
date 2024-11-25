/* eslint-disable camelcase */
const Joi = require('joi');

const registerSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  gender: Joi.string().required(),
  phone_number: Joi.string().required(),
  address: Joi.string().required(),
});

module.exports = { registerSchema };
