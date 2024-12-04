const Joi = require('joi');

const RequestPayloadSchema = Joi.object({
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
});
module.exports = { RequestPayloadSchema };
