/* eslint-disable no-console */
const express = require('express');
const app = express();
const db = require('./models/index');
const logger = require('morgan');
const router = require('./router');
const conf = require('./config');

app.use(
  logger(':method :url :status :res[content-length] - :response-time ms')
);
app.use(express.json());
app.use(router);

(async function () {
  await db;
  console.log(`✅ Connected to DB`);
  app.listen(conf.PORT, () => {
    console.log(`✅ Server is listening at http://localhost:${conf.PORT}`);
  });
})();

module.exports = app;
