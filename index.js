const express = require('express');

const {
  AinftHandler,
  ErrorHandler,
  ErrorUtil
} = require('./handlers');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/assistants/create', AinftHandler.createAssistant);
app.post('/assistants/get', AinftHandler.getAssistant);
app.post('/threads/create', AinftHandler.createThread);
app.post('/threads/get', AinftHandler.getThread);
app.post('/messages/create', AinftHandler.createMessage);
app.post('/messages/get', AinftHandler.getMessage);
app.post('/credit/charge', AinftHandler.chargeAinizeCredit);
app.post('/credit/get', AinftHandler.getAinizeCredit);

app.put('/assistants/update', AinftHandler.updateAssistant);

app.delete('/assistants/delete', AinftHandler.deleteAssistant);
app.delete('/threads/delete', AinftHandler.deleteThread);

app.get('/assistants/list', AinftHandler.listAssistants);
app.get('/threads/list', AinftHandler.listThreads);

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
