const mongoose = require('mongoose');
const conf = require('../config');

mongoose.connect(`${conf.dbUrl}${conf.dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

module.exports = mongoose;
