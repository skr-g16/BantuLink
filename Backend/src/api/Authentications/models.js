const Joi = require('joi');

// Authentication Models
const AuthenticationModels = {
  LoginRequest: Joi.object({
    email: Joi.string()
      .email()
      .required()
      .description('Email for login')
      .example('user@example.com'),
    password: Joi.string()
      .required()
      .description('Password for login')
      .example('password'),
  }).label('LoginRequest'),

  LoginResponse: Joi.object({
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
  }).label('LoginResponse'),

  RefreshTokenRequest: Joi.object({
    refreshToken: Joi.string()
      .required()
      .description('Refresh token for generating new access token')
      .example('refreshToken'),
  }).label('RefreshTokenRequest'),

  RefreshTokenResponse: Joi.object({
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
  }).label('RefreshTokenResponse'),

  LogoutRequest: Joi.object({
    refreshToken: Joi.string()
      .required()
      .description('Refresh token to delete')
      .example('refreshToken'),
  }).label('LogoutRequest'),

  LogoutResponse: Joi.object({
    status: Joi.string().description('Response status').example('success'),
    message: Joi.string()
      .description('Response message')
      .example('Refresh token berhasil dihapus'),
  }).label('LogoutResponse'),
};

module.exports = AuthenticationModels;
