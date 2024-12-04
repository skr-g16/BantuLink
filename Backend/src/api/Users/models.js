/* eslint-disable camelcase */
const Joi = require('joi');

const registerResponse = Joi.object({
  status: Joi.string()
    .required()
    .description('Response status')
    .example('success'),
  message: Joi.string()
    .required()
    .description('Response message')
    .example('User berhasil ditambahkan'),
  data: Joi.object({
    userId: Joi.string()
      .required()
      .description('ID of the user')
      .example('user-123'),
  }),
});

const getUserResponse = Joi.object({
  status: Joi.string()
    .required()
    .description('Response status')
    .example('success'),
  data: Joi.object({
    userId: Joi.string()
      .required()
      .description('ID of the user')
      .example('user-123'),
    fullname: Joi.string()
      .required()
      .description('Full name of the user')
      .example('John Doe'),
    email: Joi.string()
      .required()
      .description('Email of the user')
      .example('2y2t9@example.com'),
    gender: Joi.string()
      .required()
      .description('Gender of the user')
      .example('male'),
    phone_number: Joi.string()
      .required()
      .description(' +62, 62, atau 0 diikuti 8-12 digit')
      .example('+6281234567890'),
    address: Joi.string()
      .required()
      .description('Address of the user')
      .example('Jl. Raya, Jakarta, Indonesia'),
    created_at: Joi.string().required(),
    updated_at: Joi.string().required(),
  }),
});

const updateResponse = Joi.object({
  status: Joi.string()
    .required()
    .description('Response status')
    .example('success'),
  message: Joi.string()
    .required()
    .description('Response message')
    .example('User berhasil diperbarui'),
});

module.exports = {
  getUserResponse,
  registerResponse,
  updateResponse,
};
