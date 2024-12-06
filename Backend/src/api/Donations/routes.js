const { donationPayloadSchema } = require('../../validator/Donations/schema');
const { createDonationResponse } = require('./models');
const routes = (handler) => [
  {
    method: 'POST',
    path: '/donations',
    handler: handler.postDonationHandler,
    options: {
      auth: 'bantulink_jwt',
      tags: ['api', 'donations'],
      description: 'Add new donation',
      validate: {
        payload: donationPayloadSchema,
      },
      plugins: {
        'hapi-swagger': {
          security: [{ Bearer: [] }],
          responses: {
            201: {
              description: 'Created',
              schema: createDonationResponse,
            },
          },
        },
      },
    },
  },
];

module.exports = routes;
