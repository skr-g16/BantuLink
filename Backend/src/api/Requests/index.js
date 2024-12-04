const RequestsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'requests',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const requestsHandler = new RequestsHandler(service, validator);
    server.route(routes(requestsHandler));
  },
};
