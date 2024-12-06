const DonationsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'donations',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const donationsHandler = new DonationsHandler(service, validator);
    server.route(routes(donationsHandler));
  },
};
