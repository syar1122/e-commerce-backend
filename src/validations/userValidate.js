const Joi = require("joi");

let userValidation = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  age: Joi.number().min(4),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string()
    .min(6)
    .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
    .required()
    .messages({
      "string.pattern.base": "password reg ex err",
    }),
});

let loginValidation = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string()
    .min(6)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
});

module.exports = { userValidation, loginValidation };
