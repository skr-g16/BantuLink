const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserHandler,
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: handler.getUserByIdHandler,
    options: {
      auth: 'bantulink_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/users/{id}',
    handler: handler.putUserHandler,
    options: {
      auth: 'bantulink_jwt',
    },
  },
];
module.exports = routes;
