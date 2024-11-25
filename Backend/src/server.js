const Hapi = require('@hapi/hapi');
require('dotenv').config();

const ClientError = require('./exceptions/ClientError');

//users
const UsersService = require('./services/postgres/UsersServices');
const UsersValidator = require('./validator/Users');
const users = require('./api/Users');

const init = async () => {
  const usersService = new UsersService();
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: users,
    options: {
      service: usersService,
      validator: UsersValidator,
    },
  });

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
