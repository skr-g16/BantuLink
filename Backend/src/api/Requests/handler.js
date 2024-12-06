const autoBind = require('auto-bind');
class RequestsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    autoBind(this);
  }

  async postRequestHandler(request, h) {
    this._validator.validateRequestPayload(request.payload);
    const { id: credentialId } = request.auth.credentials;
    const { disasterId, description, requestItems } = request.payload;
    const requestId = await this._service.addRequest({
      disasterId,
      description,
      requestItems,
      owner: credentialId,
    });

    const response = h.response({
      status: 'success',
      message: 'Request bantuan berhasil dibuat',
      data: {
        requestId,
      },
    });
    response.code(201);
    return response;
  }

  async getRequestsHandler() {
    const requests = await this._service.getRequests();
    return {
      status: 'success',
      data: {
        requests,
      },
    };
  }

  async getRequestByOwnerHander(request) {
    const { id: credentialId } = request.auth.credentials;
    const requests = await this._service.getRequestByOwner(credentialId);
    return {
      status: 'success',
      data: {
        requests,
      },
    };
  }

  async getRequestByIdHandler(request) {
    const { id } = request.params;
    const requestData = await this._service.getRequestById(id);
    return {
      status: 'success',
      data: {
        request: requestData,
      },
    };
  }

  async updateRequestHandler(request) {
    this._validator.validateRequestPayload(request.payload);
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;
    await this._service.verifyRequestOwner(id, credentialId);
    await this._service.updateRequest(id, request.payload);
    return {
      status: 'success',
      message: 'Request berhasil diperbarui',
    };
  }

  async deleteRequestHandler(request) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;
    await this._service.verifyRequestOwner(id, credentialId);
    await this._service.deleteRequest(id);
    return {
      status: 'success',
      message: 'Request berhasil dihapus',
    };
  }

  async getRequesItemsByRequestId(request) {
    const { id } = request.params;
    console.log(id);
    const requestItems = await this._service.getRequestItemsByRequestId(id);
    return {
      status: 'success',
      data: {
        requestItems,
      },
    };
  }
}

module.exports = RequestsHandler;
