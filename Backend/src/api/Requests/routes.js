const { RequestPayloadSchema } = require('../../validator/Requests/schema');
const {
  createRequestResponse,
  getResponseById,
  getAllResponse,
  updateResponse,
  deleteResponse,
  getResponseByOwner,
  getResponseRequestItemsByRequestId,
} = require('./models');
const routes = (handler) => [
  {
    method: 'POST',
    path: '/requests',
    handler: handler.postRequestHandler,
    options: {
      auth: 'bantulink_jwt',
      tags: ['api', 'requests'],
      description: 'Add new request',
      validate: {
        payload: RequestPayloadSchema,
      },
      plugins: {
        'hapi-swagger': {
          security: [{ Bearer: [] }],
          responses: {
            201: {
              description: 'Created',
              schema: createRequestResponse,
            },
          },
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/requests/{id}',
    handler: handler.getRequestByIdHandler,
    options: {
      tags: ['api', 'requests'],
      description: 'Get request by id',
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success',
              schema: getResponseById,
            },
          },
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/requests/owner',
    handler: handler.getRequestByOwnerHander,
    options: {
      auth: 'bantulink_jwt',
      tags: ['api', 'requests'],
      description: 'Get request by Owner',
      plugins: {
        'hapi-swagger': {
          security: [{ Bearer: [] }],
          responses: {
            200: {
              description: 'Success',
              schema: getResponseByOwner,
            },
          },
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/requests',
    handler: (request) => handler.getRequestsHandler(request),
    options: {
      tags: ['api', 'requests'],
      description: 'Get all requests',
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success',
              schema: getAllResponse,
            },
          },
        },
      },
    },
  },
  {
    method: 'PUT',
    path: '/requests/{id}',
    handler: handler.updateRequestHandler,
    options: {
      auth: 'bantulink_jwt',
      tags: ['api', 'requests'],
      description: 'Update request by id',
      validate: {
        payload: RequestPayloadSchema,
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
  {
    method: 'DELETE',
    path: '/requests/{id}',
    handler: handler.deleteRequestHandler,
    options: {
      auth: 'bantulink_jwt',
      tags: ['api', 'requests'],
      description: 'Delete request by id',
      plugins: {
        'hapi-swagger': {
          security: [{ Bearer: [] }],
          responses: {
            200: {
              description: 'Success',
              schema: deleteResponse,
            },
          },
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/requests/items/{id}',
    handler: handler.getRequesItemsByRequestId,
    options: {
      tags: ['api', 'requests'],
      description: 'Get request items by id',
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success',
              schema: getResponseRequestItemsByRequestId,
            },
          },
        },
      },
    },
  },
];

module.exports = routes;
