const Joi = require('joi');

const _joiSubSchema = {
  messageSchema: Joi.object({
    role: Joi.string().valid('user').required(),
    content: Joi.string().required(),
    file_ids: Joi.array().max(10),
    metadata: Joi.object()
  })
};

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
  retrieveAssistantSchema: Joi.object({
    assistant_id: Joi.string().required()
  }),
  modifyAssistantSchema: Joi.object({
    assistant_id: Joi.string().required(),
    model: Joi.string(),
    name: Joi.string().max(256),
    description: Joi.string().max(512),
    instructions: Joi.string().max(32768),
    tools: Joi.array().max(128),
    file_ids: Joi.array().max(20),
    metadata: Joi.object()
  }),
  deleteAssistantSchema: Joi.object({
    assistant_id: Joi.string().required()
  }),
  createThreadSchema: Joi.object({
    messages: Joi.array().items(_joiSubSchema.messageSchema),
    metadata: Joi.object()
  }),
  retrieveThreadSchema: Joi.object({
    thread_id: Joi.string().required()
  }),
  modifyThreadSchema: Joi.object({
    metadata: Joi.object()
  }),
  deleteThreadSchema: Joi.object({
    thread_id: Joi.string().required()
  }),
  createMessageSchema: Joi.object({
    thread_id: Joi.string().required(),
    role: Joi.string().valid('user').required(),
    content: Joi.string().required(),
    file_ids: Joi.array().max(10),
    metadata: Joi.object()
  }),
  listMessagesSchema: Joi.object({
    thread_id: Joi.string().required(),
    limit: Joi.number().min(1).max(100),
    order: Joi.string().valid('asc', 'desc'),
    after: Joi.string(),
    before: Joi.string()
  }),
  retrieveMessageSchema: Joi.object({
    thread_id: Joi.string().required(),
    message_id: Joi.string().required(),
  }),
  modifyMessageSchema: Joi.object({
    thread_id: Joi.string().required(),
    message_id: Joi.string().required(),
    metadata: Joi.object()
  }),
  createRunSchema: Joi.object({
    thread_id: Joi.string().required(),
    assistant_id: Joi.string().required(),
    model: Joi.string(),
    instructions: Joi.string(),
    additional_instructions: Joi.string(),
    tools: Joi.array(),
    metadata: Joi.object()
  }),
  listRunsSchema: Joi.object({
    thread_id: Joi.string().required(),
    limit: Joi.number().min(1).max(100),
    order: Joi.string().valid('asc', 'desc'),
    after: Joi.string(),
    before: Joi.string()
  }),
  listRunStepsSchema: Joi.object({
    thread_id: Joi.string().required(),
    run_id: Joi.string().required(),
    limit: Joi.number().min(1).max(100),
    order: Joi.string().valid('asc', 'desc'),
    after: Joi.string(),
    before: Joi.string()
  }),
  retrieveRunSchema: Joi.object({
    thread_id: Joi.string().required(),
    run_id: Joi.string().required()
  }),
  retrieveRunStepSchema: Joi.object({
    thread_id: Joi.string().required(),
    run_id: Joi.string().required(),
    step_id: Joi.string().required()
  }),
  modifyRunSchema: Joi.object({
    thread_id: Joi.string().required(),
    run_id: Joi.string().required(),
    metadata: Joi.object()
  }),
  cancelRunSchema: Joi.object({
    thread_id: Joi.string().required(),
    run_id: Joi.string().required()
  })
};

module.exports = {
  joiSchema
};
