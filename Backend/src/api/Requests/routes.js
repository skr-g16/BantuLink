const RequestsModels = require('./models');
const routes = (handler) => [
  {
    method: 'POST',
    path: '/requests',
    handler: (request, h) => handler.postRequestHandler(request, h),
    options: {
      auth: 'bantulink_jwt',
      tags: ['api', 'requests'],
      description: 'Add new request',
      validate: {
        payload: RequestsModels.CreateRequest,
      },
      response: {
        status: {
          201: RequestsModels.CreateRequestResponse,
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/requests/{id}',
    handler: (request) => handler.getRequestByIdHandler(request),
    options: {
      tags: ['api', 'requests'],
      description: 'Get request by id',
      response: {
        status: {
          200: RequestsModels.GetResponse,
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
      response: {
        status: {
          200: RequestsModels.GetAllResponse,
        },
      },
    },
  },
  {
    method: 'PUT',
    path: '/requests/{id}',
    handler: (request) => handler.updateRequestHandler(request),
    options: {
      auth: 'bantulink_jwt',
      tags: ['api', 'requests'],
      description: 'Update request by id',
      validate: {
        payload: RequestsModels.UpdateRequest,
      },
      response: {
        status: {
          200: RequestsModels.UpdateResponse,
        },
      },
    },
  },
  {
    method: 'DELETE',
    path: '/requests/{id}',
    handler: (request) => handler.deleteRequestHandler(request),
    options: {
      auth: 'bantulink_jwt',
      tags: ['api', 'requests'],
      description: 'Delete request by id',
      response: {
        status: {
          200: RequestsModels.DeleteResponse,
        },
      },
    },
  },
];

module.exports = routes;
