const express = require('express');

const {
  OpenaiAinizeHandler,
  Middleware,
  ErrorHandler,
  ErrorUtil
} = require('./handlers');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/service', Middleware.classifyJobType, OpenaiAinizeHandler.service);
app.post('/deposit', OpenaiAinizeHandler.deposit);

// NOTE(minsu): needs discussion about the structure below
app.post('/assistants/create', OpenaiAinizeHandler.createAssistant);
app.post('/assistants/get', OpenaiAinizeHandler.getAssistant);
app.post('/threads/create', OpenaiAinizeHandler.createThread);
app.post('/threads/get', OpenaiAinizeHandler.getThread);
app.post('/messages/create', OpenaiAinizeHandler.createMessage);
app.post('/messages/get', OpenaiAinizeHandler.getMessage);
app.post('/credit/charge', OpenaiAinizeHandler.chargeAinizeCredit);
app.post('/credit/get', OpenaiAinizeHandler.getAinizeCredit);

app.put('/assistants/update', OpenaiAinizeHandler.updateAssistant);

app.delete('/assistants/delete', OpenaiAinizeHandler.deleteAssistant);
app.delete('/threads/delete', OpenaiAinizeHandler.deleteThread);

app.get('/assistants/list', OpenaiAinizeHandler.listAssistants);
app.get('/threads/list', OpenaiAinizeHandler.listThreads);

app.get('/health', (req, res, next) => {
  try {
    res.status(200).json({ data: 'ok' });
  } catch (error) {
    throw ErrorUtil.setCustomError(500, error);
  }
});

/**
 * Handling all errors here.
 */
app.use(ErrorHandler.sendErrorResponse);

app.listen(port, () => {
  console.log(`Express server is running on port(${port}).`);
});
