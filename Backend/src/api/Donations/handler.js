const autoBind = require('auto-bind');

class DonationsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    autoBind(this);
  }

  async postDonationHandler(request, h) {
    this._validator.validateDonationPayload(request.payload);
    const { id: credentialId } = request.auth.credentials;
    const { donationItems } = request.payload;
    const donationId = await this._service.addDonation({
      donationItems,
      owner: credentialId,
    });
    const response = h.response({
      status: 'success',
      message: 'Donasi berhasil dibuat',
      data: {
        donationId,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = DonationsHandler;
