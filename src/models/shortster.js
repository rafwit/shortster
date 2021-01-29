// there is assumption, that this collection can work as a part of another db.
// It is intended to serve only for URL Shortster microservice purposes, hence the collection name
// and containing documents

const mongoose = require('.');

const { Schema } = mongoose;

const shortsterSchema = new Schema({
  origin: String,
  origin_short: {
    type: String,
    unique: true,
    maxlength: 6,
    minlength: 4,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  numbers_clicked: Number,
  last_clicked: Number,
});

const Shortster = mongoose.model('Shortster', shortsterSchema);

module.exports = Shortster;
