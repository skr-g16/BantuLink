const {
  registerSchema,
  updateProfileSchema,
} = require('../../validator/Users/schema');
const {
  registerResponse,
  getUserResponse,
  updateResponse,
} = require('./models');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserHandler,
    options: {
      tags: ['api', 'users'],
      description: 'Add new user',
      validate: {
        payload: registerSchema,
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            201: {
              description: 'Created',
              schema: registerResponse,
            },
          },
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
      plugins: {
        'hapi-swagger': {
          securityDefinitions: {
            Bearer: {
              type: 'apiKey',
              name: 'Authorization',
              in: 'header',
              description: 'JWT Token',
            },
          },
          security: [{ Bearer: [] }],
          responses: {
            200: {
              description: 'Success',
              schema: getUserResponse,
            },
          },
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
        payload: updateProfileSchema,
      },
      plugins: {
        'hapi-swagger': {
          security: [{ Bearer: [] }],
          responses: {
            200: {
              description: 'Success',
              schema: updateResponse,
            },
          },
        },
      },
    },
  },
];
module.exports = routes;
