const UserModels = require('./models');
const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserHandler,
    options: {
      tags: ['api', 'users'],
      description: 'Add new user',
      validate: {
        payload: UserModels.RegisterRequest,
      },
      response: {
        status: {
          201: UserModels.RegisterResponse,
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: handler.getUserByIdHandler,
    options: {
      auth: 'bantulink_jwt',
      tags: ['api', 'users'],
      description: 'Get user profile by id',
      response: {
        status: {
          200: UserModels.GetUserResponse,
        },
      },
    },
  },
  {
    method: 'PUT',
    path: '/users/{id}',
    handler: handler.putUserHandler,
    options: {
      auth: 'bantulink_jwt',
      tags: ['api', 'users'],
      description: 'Update user profile by id',
      validate: {
        payload: UserModels.UpdateRequest,
      },
      response: {
        status: {
          200: UserModels.UpdateResponse,
        },
      },
    },
  },
];
module.exports = routes;
