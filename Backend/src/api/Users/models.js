/* eslint-disable camelcase */
const Joi = require('joi');

const UserModels = {
  RegisterRequest: Joi.object({
    name: Joi.string()
      .required()
      .description('Name of the user')
      .example('John Doe'),
    email: Joi.string()
      .email()
      .required()
      .description('Email of the user')
      .example('johndoe@example.com'),
    password: Joi.string()
      .required()
      .description('Password of the user')
      .example('password'),
    gender: Joi.string()
      .required()
      .description('Gender of the user')
      .example('male'),
    phone_number: Joi.string()
      .pattern(/^(?:\+62|62|0)[2-9][0-9]{8,12}$/)
      .required()
      .messages({
        'string.pattern.base': 'Nomor telepon tidak valid',
        'string.empty': 'Nomor telepon tidak boleh kosong',
      }),
    address: Joi.string()
      .min(10)
      .required()
      .description('Address of the user')
      .example('Jalan Jalan'),
  }).label('RegisterRequest'),

  RegisterResponse: Joi.object({
    status: Joi.string()
      .required()
      .description('Response status')
      .example('success'),
    message: Joi.string()
      .required()
      .description('Response message')
      .example('User berhasil ditambahkan'),
  }).label('RegisterResponse'),

  GetUserResponse: Joi.object({
    status: Joi.string()
      .required()
      .description('Response status')
      .example('success'),
    data: Joi.object({
      userId: Joi.string()
        .required()
        .description('ID of the user')
        .example('user-123'),
    }),
  }).label('GetUserResponse'),

  UpdateRequest: Joi.object({
    name: Joi.string()
      .required()
      .description('Name of the user')
      .example('John Doe'),
    email: Joi.string()
      .email()
      .required()
      .description('Email of the user')
      .example('johndoe@example.com'),
    password: Joi.string()
      .required()
      .description('Password of the user')
      .example('password'),
    gender: Joi.string()
      .required()
      .description('Gender of the user')
      .example('male'),
    phone_number: Joi.string()
      .pattern(/^(?:\+62|62|0)[2-9][0-9]{8,12}$/)
      .required()
      .messages({
        'string.pattern.base': 'Nomor telepon tidak valid',
        'string.empty': 'Nomor telepon tidak boleh kosong',
      }),
    address: Joi.string()
      .min(10)
      .required()
      .description('Address of the user')
      .example('Jalan Jalan'),
  }).label('UpdateRequest'),

  UpdateResponse: Joi.object({
    status: Joi.string()
      .required()
      .description('Response status')
      .example('success'),
    message: Joi.string()
      .required()
      .description('Response message')
      .example('User berhasil diperbarui'),
  }).label('UpdateResponse'),
};

module.exports = UserModels;
