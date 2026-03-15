const joi = require("joi");

const schema = joi
  .object({
    title: joi.string().required(),
    description: joi.string().required(),
    location: joi.string().required(),
    country: joi.string().required(),
    price: joi.number().required(),
    category: joi.string().required(),
  })
  .required();

const reviewSchema = joi
  .object({
    rating: joi.number().required(),
    comment: joi.string().required(),
  })
  .required();

module.exports = { schema, reviewSchema };
