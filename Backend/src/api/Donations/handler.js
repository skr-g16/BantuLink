const autoBind = require('auto-bind');

class DonationsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    autoBind(this);
  }

  async postDonationHandler(request, h) {
    this._validator.validateDonationPayload(request.payload);
    const { owner: credentialId } = request.auth.credentials;
    const { requestId, descriptions, donationItems } = request.payload;
    const donationId = await this._service.addDonation({
      requestId,
      descriptions,
      owner: credentialId,
      donationItems,
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

  async getDonationByIdHandler(request) {
    const { id } = request.params;
    const donationData = await this._service.getDonationById(id);
    return {
      status: 'success',
      data: {
        donation: donationData,
      },
    };
  }

  async getDonationsByOwner(request) {
    const { id: credentialId } = request.auth.credentials;
    const donations = await this._service.getDonationsByOwner(credentialId);
    return {
      status: 'success',
      data: {
        donations,
      },
    };
  }

  async putDonationHandler(request) {
    this._validator.validateUpdateDonationStatusPayload(request.payload);
    const { id: credentialId } = request.auth.credentials;
    const { id } = request.params;
    const { status } = request.payload;
    await this._service.verifyDonationOwner(id, credentialId);
    await this._service.updateDonationStatus(id, status);
    return {
      status: 'success',
      message: 'Status donasi berhasil diperbarui',
    };
  }

  async deleteDonationHandler(request) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;
    await this._service.verifyDonationOwner(id, credentialId);
    await this._service.deleteDonation(id);
    return {
      status: 'success',
      message: 'Donasi berhasil dihapus',
    };
  }
}

module.exports = DonationsHandler;
