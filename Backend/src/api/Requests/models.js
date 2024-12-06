const Joi = require('joi');

const createRequestResponse = Joi.object({
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
});

const getResponseById = Joi.object({
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
});

const getResponseByOwner = Joi.object({
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
});

const getAllResponse = Joi.object({
  status: Joi.string()
    .required()
    .description('Response status')
    .example('success'),
  data: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().required().example('request-123'),
        disasterId: Joi.string().required().example('disaster-123'),
        description: Joi.string().required().example('Bantuan bencana alam'),
        requestItems: Joi.array()
          .items(
            Joi.object({
              categoryId: Joi.string().required().example('category-123'),
              quantity: Joi.number().integer().min(1).required().example(10),
              unitId: Joi.string().required().example('unit-123'),
              description: Joi.string().required().example('Peralatan bantuan'),
            })
          )
          .min(1)
          .required()
          .example([
            {
              categoryId: 'category-123',
              quantity: 10,
              unitId: 'unit-123',
              description: 'Peralatan bantuan',
            },
            {
              categoryId: 'category-124',
              quantity: 20,
              unitId: 'unit-124',
              description: 'Makanan',
            },
          ]),
      })
    )
    .required()
    .example([
      {
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
      },
      {
        id: 'request-124',
        disasterId: 'disaster-124',
        description: 'Bantuan gempa',
        requestItems: [
          {
            categoryId: 'category-124',
            quantity: 20,
            unitId: 'unit-124',
            description: 'Makanan',
          },
        ],
      },
    ]),
});

const updateResponse = Joi.object({
  status: Joi.string()
    .required()
    .description('Response status')
    .example('success'),
  message: Joi.string()
    .required()
    .description('Response message')
    .example('Request bantuan berhasil diperbarui'),
});

const deleteResponse = Joi.object({
  status: Joi.string()
    .required()
    .description('Response status')
    .example('success'),
  message: Joi.string()
    .required()
    .description('Response message')
    .example('Request bantuan berhasil dihapus'),
});

const getResponseRequestItemsByRequestId = Joi.object({
  status: Joi.string()
    .required()
    .description('Response status')
    .example('success'),
  data: Joi.array().items(
    Joi.object({
      requestItems: Joi.array()
        .items(
          Joi.object({
            id: Joi.string().required().example('request-item-123'),
            requestId: Joi.string().required().example('request-123'),
            categoryId: Joi.string().required().example('category-123'),
            quantity: Joi.number().integer().min(1).required().example(10),
            unitId: Joi.string().required().example('unit-123'),
            description: Joi.string().required().example('Peralatan bantuan'),
          })
        )
        .min(1)
        .required()
        .example([
          {
            id: 'request-item-123',
            requestId: 'request-123',
            categoryId: 'category-123',
            quantity: 10,
            unitId: 'unit-123',
            description: 'Peralatan bantuan',
          },
          {
            id: 'request-item-124',
            requestId: 'request-123',
            categoryId: 'category-124',
            quantity: 20,
            unitId: 'unit-124',
            description: 'Makanan',
          },
        ]),
    })
  ),
});

module.exports = {
  createRequestResponse,
  getResponseById,
  getAllResponse,
  updateResponse,
  deleteResponse,
  getResponseByOwner,
  getResponseRequestItemsByRequestId,
};
