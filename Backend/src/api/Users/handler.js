/* eslint-disable camelcase */
const autoBind = require('auto-bind');
const AuthorizationError = require('../../exceptions/AuthorizationsError');

class UsersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    autoBind(this);
  }
  async postUserHandler(request, h) {
    this._validator.validateRegisterPayload(request.payload);
    const { fullname, email, password, phone_number, gender, address } =
      request.payload;
    const id = await this._service.addUser({
      fullname,
      email,
      password,
      phone_number,
      gender,
      address,
    });
    const response = h.response({
      status: 'success',
      message: 'User berhasil ditambahkan',
      data: {
        userId: id,
      },
    });
    response.code(201);
    return response;
  }
  async getUserByIdHandler(request) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;
    if (id !== credentialId) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
    }
    const user = await this._service.getUserById(id);
    return {
      status: 'success',
      data: {
        user,
      },
    };
  }

  async putUserHandler(request) {
    this._validator.validateUpdateProfilePayload(request.payload);
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;
    if (id !== credentialId) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
    }
    const { fullname, email, password, phone_number, gender, address } =
      request.payload;
    await this._service.editProfileUser(id, {
      fullname,
      email,
      password,
      phone_number,
      gender,
      address,
    });
    return {
      status: 'success',
      message: 'Profile berhasil di Update',
    };
  }
}

module.exports = UsersHandler;
