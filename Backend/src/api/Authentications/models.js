const Joi = require('joi');

// Authentication Models
const loginResponse = Joi.object({
  status: Joi.string()
    .required()
    .description('Response status')
    .example('success'),
  message: Joi.string()
    .required()
    .description('Response message')
    .example('Authentication berhasil ditambahkan'),
  data: Joi.object({
    accessToken: Joi.string()
      .required()
      .description('JWT access token')
      .example('accessToken'),
    refreshToken: Joi.string()
      .required()
      .description('JWT refresh token')
      .example('refreshToken'),
  }),
});

const refreshTokenResponse = Joi.object({
  status: Joi.string()
    .required()
    .description('Response status')
    .example('success'),
  message: Joi.string()
    .required()
    .description('Response message')
    .example('Access Token berhasil diperbarui'),
  data: Joi.object({
    accessToken: Joi.string()
      .required()
      .description('JWT access token')
      .example('accessToken'),
  }),
});

const logoutResponse = Joi.object({
  status: Joi.string()
    .required()
    .description('Response status')
    .example('success'),
  message: Joi.string()
    .required()
    .description('Response message')
    .example('Refresh token berhasil dihapus'),
});

module.exports = {
  loginResponse,
  refreshTokenResponse,
  logoutResponse,
};
