const Joi = require('joi');

const RequestsModels = {
  CreateRequest: Joi.object({
    disasterId: Joi.string().required(),
    description: Joi.string().required(),
    requestItems: Joi.array()
      .items(
        Joi.object({
          categoryId: Joi.string().required(),
          quantity: Joi.number().integer().min(1).required(),
          unitId: Joi.string().required(),
          description: Joi.string().required(),
        })
      )
      .min(1)
      .required(),
  }).label('CreateRequestRequest'),

  CreateRequestResponse: Joi.object({
    status: Joi.string()
      .required()
      .description('Response status')
      .example('success'),
    message: Joi.string()
      .required()
      .description('Response message')
      .example('Request bantuan berhasil dibuat'),
    data: Joi.object({
      requestId: Joi.string()
        .required()
        .description('Request ID')
        .example('request-123'),
    }),
  }).label('CreateRequestResponse'),

  GetResponse: Joi.object({
    status: Joi.string()
      .required()
      .description('Response status')
      .example('success'),
    data: Joi.object({
      requestId: Joi.string()
        .required()
        .description('Request Data')
        .example({
          id: 'request-123',
          disasterId: 'disaster-123',
          description: 'Bantuan bencana alam',
          requestItems: [
            {
              categoryId: 'category-123',
              quantity: 10,
              unitId: 'unit-123',
              description: 'Peralatan bantuan',
            },
          ],
        }),
    }),
  }).label('CreateRequestResponse'),

  GetAllResponse: Joi.object({
    status: Joi.string()
      .required()
      .description('Response status')
      .example('success'),
    data: Joi.array()
      .items(
        Joi.object({
          id: Joi.string().required(),
          disasterId: Joi.string().required(),
          description: Joi.string().required(),
          requestItems: Joi.array()
            .items(
              Joi.object({
                categoryId: Joi.string().required(),
                quantity: Joi.number().integer().min(1).required(),
                unitId: Joi.string().required(),
                description: Joi.string().required(),
              })
            )
            .min(1)
            .required(),
        })
      )
      .required(),
  }).label('GetAllResponse'),

  UpdateRequest: Joi.object({
    disasterId: Joi.string().required(),
    description: Joi.string().required(),
    requestItems: Joi.array()
      .items(
        Joi.object({
          categoryId: Joi.string().required(),
          quantity: Joi.number().integer().min(1).required(),
          unitId: Joi.string().required(),
          description: Joi.string().required(),
        })
      )
      .min(1)
      .required(),
  }).label('UpdateRequest'),

  UpdateResponse: Joi.object({
    status: Joi.string()
      .required()
      .description('Response status')
      .example('success'),
    message: Joi.string()
      .required()
      .description('Response message')
      .example('Request bantuan berhasil diperbarui'),
  }).label('UpdateResponse'),

  DeleteResponse: Joi.object({
    status: Joi.string()
      .required()
      .description('Response status')
      .example('success'),
    message: Joi.string()
      .required()
      .description('Response message')
      .example('Request bantuan berhasil dihapus'),
  }).label('DeleteResponse'),
};

module.exports = RequestsModels;
