const { donationPayloadSchema } = require('../../validator/Donations/schema');
const {
  createDonationResponse,
  getDonationByOwnerResponse,
  getDonationByIdResponse,
  updateDonationsResponse,
  deleteDonationsResponse,
} = require('./models');
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
  {
    method: 'GET',
    path: '/donations/{id}',
    handler: handler.getDonationByIdHandler,
    options: {
      tags: ['api', 'donations'],
      description: 'Get donation by id',
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Succes',
              schema: getDonationByIdResponse,
            },
          },
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/donations/owner',
    handler: handler.getDonationsByOwner,
    options: {
      auth: 'bantulink_jwt',
      tags: ['api', 'donations'],
      description: 'Get donation by owner',
      plugins: {
        'hapi-swagger': {
          security: [{ Bearer: [] }],
          responses: {
            200: {
              description: 'Succes',
              schema: getDonationByOwnerResponse,
            },
          },
        },
      },
    },
  },
  {
    method: 'PUT',
    path: '/donations/{id}',
    handler: handler.putDonationHandler,
    options: {
      auth: 'bantulink_jwt',
      tags: ['api', 'donations'],
      description: 'Update donation by id',
      validate: {
        payload: donationPayloadSchema,
      },
      plugins: {
        'hapi-swagger': {
          security: [{ Bearer: [] }],
          responses: {
            200: {
              description: 'Succes',
              schema: updateDonationsResponse,
            },
          },
        },
      },
    },
  },
  {
    method: 'DELETE',
    path: '/donations/{id}',
    handler: handler.deleteDonationHandler,
    options: {
      auth: 'bantulink_jwt',
      tags: ['api', 'donations'],
      description: 'Delete donation by id',
      plugins: {
        'hapi-swagger': {
          security: [{ Bearer: [] }],
          responses: {
            200: {
              description: 'Succes',
              schema: deleteDonationsResponse,
            },
          },
        },
      },
    },
  },
];

module.exports = routes;
