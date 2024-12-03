const routes = (handler) => [
  {
    method: 'POST',
    path: '/requests',
    handler: (request, h) => handler.postRequestHandler(request, h),
    options: {
      auth: 'bantulink_jwt',
    },
  },
  {
    method: 'GET',
    path: '/requests/{id}',
    handler: (request) => handler.getRequestByIdHandler(request),
    options: {
      auth: 'bantulink_jwt',
    },
  },
  {
    method: 'GET',
    path: '/requests',
    handler: (request) => handler.getRequestsHandler(request),
  },
  {
    method: 'PUT',
    path: '/requests/{id}',
    handler: (request) => handler.updateRequestHandler(request),
    options: {
      auth: 'bantulink_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/requests/{id}',
    handler: (request) => handler.deleteRequestHandler(request),
    options: {
      auth: 'bantulink_jwt',
    },
  },
];

module.exports = routes;
