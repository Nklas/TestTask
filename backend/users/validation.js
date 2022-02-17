const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');

const createUserSchema = (req, res, next) => {
  console.log(req.body);
  const schema = Joi.object({
    user_name: Joi.string().required(),
    email: Joi.string().email().required(),
    data: Joi.string(),
  });
  validateRequest(req, next, schema);
};

module.exports = {
  createUserSchema
};