const {
  loginSchema,
  putRefreshTokenSchema,
  logoutSchema,
} = require('../../validator/Authentications/schema');
const {
  loginResponse,
  refreshTokenResponse,
  logoutResponse,
} = require('./models');
const routes = (handler) => [
  {
    method: 'POST',
    path: '/authentications',
    handler: handler.postAuthenticationHandler,
    options: {
      tags: ['api', 'authentications'],
      description: 'Create new authentication / Login',
      validate: {
        payload: loginSchema,
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            201: {
              description: 'Created',
              schema: loginResponse,
            },
          },
        },
      },
    },
  },
  {
    method: 'PUT',
    path: '/authentications',
    handler: handler.putAuthenticationHandler,
    options: {
      tags: ['api', 'authentications'],
      description: 'Refresh authentication token',
      notes: 'Returns new authentication token',
      validate: {
        payload: putRefreshTokenSchema,
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success',
              schema: refreshTokenResponse,
            },
          },
        },
      },
    },
  },
  {
    method: 'DELETE',
    path: '/authentications',
    handler: handler.deleteAuthenticationHandler,
    options: {
      tags: ['api', 'authentications'],
      description: 'Delete authentication / Logout',
      notes: 'Removes refresh token from database',
      validate: {
        payload: logoutSchema,
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success',
              schema: logoutResponse,
            },
          },
        },
      },
    },
  },
];

module.exports = routes;
