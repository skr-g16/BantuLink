const AuthenticationModels = require('./models');
const routes = (handler) => [
  {
    method: 'POST',
    path: '/authentications',
    handler: handler.postAuthenticationHandler,
    options: {
      tags: ['api', 'authentications'],
      description: 'Create new authentication / Login',
      validate: {
        payload: AuthenticationModels.LoginRequest,
      },
      response: {
        status: {
          201: AuthenticationModels.LoginResponse,
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
        payload: AuthenticationModels.RefreshTokenRequest,
      },
      response: {
        status: {
          200: AuthenticationModels.RefreshTokenResponse,
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
        payload: AuthenticationModels.LogoutRequest,
      },
      response: {
        status: {
          200: AuthenticationModels.LogoutResponse,
        },
      },
    },
  },
];

module.exports = routes;
