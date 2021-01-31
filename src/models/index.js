const mongoose = require('mongoose');
const conf = require('../config');

const currentDb =
  process.env.NODE_ENV === 'test' ? conf.testDbName : conf.dbName;

mongoose.connect(`${conf.dbUrl}${currentDb}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

module.exports = mongoose;
