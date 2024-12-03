const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
require('dotenv').config();

const ClientError = require('./exceptions/ClientError');

//users
const UsersService = require('./services/postgres/UsersServices');
const UsersValidator = require('./validator/Users');
const users = require('./api/Users');

//authentications
const authentications = require('./api/Authentications');
const AuthenticationsService = require('./services/postgres/AuthenticationsServices');
const AuthenticationsValidator = require('./validator/Authentications');
const TokenManager = require('./tokenize/TokenManager');

//requests
const RequestsService = require('./services/postgres/RequestsServices');
const RequestsValidator = require('./validator/Requests');
const requests = require('./api/Requests');

const init = async () => {
  const usersService = new UsersService();
  const authenticationsService = new AuthenticationsService();
  const requestsService = new RequestsService();
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  //register jwt
  await server.register([
    {
      plugin: Jwt,
    },
  ]);
  //define auth strategy
  server.auth.strategy('bantulink_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });

  await server.register([
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      },
    },
    {
      plugin: authentications,
      options: {
        authenticationsService,
        usersService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator,
      },
    },
    {
      plugin: requests,
      options: {
        service: requestsService,
        validator: RequestsValidator,
      },
    },
  ]);

  //custom error
  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }

    return h.continue;
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
