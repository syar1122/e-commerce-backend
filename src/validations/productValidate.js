const Joi = require("joi");

let productValidation = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(5).required(),
  price: Joi.number().required(),
  categories: Joi.array(),
  quantity: Joi.number().min(1),
});

module.exports = productValidation;
