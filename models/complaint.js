const mongoose = require('mongoose');

let schema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
  coordinate: {
    lat: Number,
    lon: Number
  },
  createdAt: Date,
  liked: Number
});

module.exports = mongoose.model('Complaint', schema);