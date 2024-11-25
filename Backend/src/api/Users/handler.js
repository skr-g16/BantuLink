/* eslint-disable camelcase */
const autoBind = require('auto-bind');

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
    const user = await this._service.getUserById(id);
    return {
      status: 'success',
      data: {
        user,
      },
    };
  }
}

module.exports = UsersHandler;
