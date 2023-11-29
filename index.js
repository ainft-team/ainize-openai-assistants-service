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

app.post('/assistants/create', AinftHandler.createAssistants);
app.post('/assistants/get', AinftHandler.getAssistants);
app.post('/threads/create', AinftHandler.createThreads);
app.post('/threads/get', AinftHandler.getThreads);
app.post('/messages/create', AinftHandler.createMessages);
app.post('/messages/get', AinftHandler.getMessages);
app.post('/credit/charge', AinftHandler.chargeAinizeCredit);
app.post('/credit/get', AinftHandler.getAinizeCredit);

app.put('/assistants/update', AinftHandler.updateAssistants);

app.delete('/assistants/delete', AinftHandler.deleteAssistants);
app.delete('/threads/delete', AinftHandler.deleteThreads);

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
