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
  })
};

module.exports = {
  joiSchema
};
