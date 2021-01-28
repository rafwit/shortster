// there is assumption, that this collection can work as a part of another db.
// It is intended to serve only for URL Shortster microservice purposes, hence the collection name
// and containing documents
const mongoose = require('./');

const Schema = mongoose.Schema;

const addressSchema = new Schema({
  origin: String,
  origin_short: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
  numbers_clicked: Number,
  last_clicked: Number,
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
