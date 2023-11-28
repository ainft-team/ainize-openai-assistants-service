const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/health', (req, res, next) => {
  res.status(200).json({ data: 'ok' });
})

app.listen(port, () => {
  console.log(`Express server is running on port(${port}).`);
})

/**
 * Handling all errors here.
 */
// app.use(ErrorHandler.sendErrorResponse);
