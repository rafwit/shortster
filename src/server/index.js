const express = require('express');
const logger = require('morgan');
const router = require('./router');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 3000;

app.use(
  logger(':method :url :status :res[content-length] - :response-time ms')
);
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`✅ Server is listening at http://localhost:${port}`);
});

module.exports = app;
