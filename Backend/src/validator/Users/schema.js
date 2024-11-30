/* eslint-disable camelcase */
const Joi = require('joi');

const registerSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  gender: Joi.string().required(),
  phone_number: Joi.string()
    .pattern(/^(?:\+62|62|0)[2-9][0-9]{8,12}$/) // +62, 62, atau 0 diikuti 8-12 digit
    .required()
    .messages({
      'string.pattern.base': 'Nomor telepon tidak valid',
      'string.empty': 'Nomor telepon tidak boleh kosong',
    }),
  address: Joi.string().min(10).required(),
});

const updateProfileSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  gender: Joi.string().required(),
  phone_number: Joi.string()
    .pattern(/^(?:\+62|62|0)[2-9][0-9]{8,12}$/) // +62, 62, atau 0 diikuti 8-12 digit
    .required()
    .messages({
      'string.pattern.base': 'Nomor telepon tidak valid',
      'string.empty': 'Nomor telepon tidak boleh kosong',
    }),
  address: Joi.string().min(10).required(),
});

module.exports = { registerSchema, updateProfileSchema };
