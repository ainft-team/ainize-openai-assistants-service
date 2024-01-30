const Joi = require('joi');

const joiSchema = {
  createAssistantSchema: Joi.object({
    model: Joi.string().required(),
    name: Joi.string().max(256),
    description: Joi.string().max(512),
    instructions: Joi.string().max(32768),
    tools: Joi.array().max(128),
    file_ids: Joi.array().max(20),
    metadata: Joi.object()
  }),
  listAssistantsSchema: Joi.object({
    limit: Joi.number().min(1).max(100),
    order: Joi.string().valid('asc', 'desc'),
    after: Joi.string(),
    before: Joi.string()
  }),
};

module.exports = {
  joiSchema
};
