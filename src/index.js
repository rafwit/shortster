/* eslint-disable no-console */
const express = require('express');
const app = express();
require('dotenv').config();
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
  try {
    app.listen(conf.PORT, () => {
      console.log(`✅ Server is listening at http://localhost:${conf.PORT}`);
    });
    await db;
    db.connection.on('connected', () => {
      console.log(`✅ Connected to DB`);
    });
    db.connection.on('error', () => {
      console.log(`❌ Error connecting to DB`);
    });
  } catch (error) {
    throw new Error(error);
  }
})();

module.exports = app;
