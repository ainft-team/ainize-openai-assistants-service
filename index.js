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

// TODO(minsu): Add Joi
app.post('/service', Middleware.classifyJobType, Middleware.joiValidate, Middleware.preventMultipleTriggering, OpenaiAinizeHandler.service);
app.post('/deposit', OpenaiAinizeHandler.deposit);

// NOTE(minsu): needs discussion about the structure below
app.post('/credit/charge', OpenaiAinizeHandler.chargeAinizeCredit);
app.post('/credit/get', OpenaiAinizeHandler.getAinizeCredit);

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
