const mongoose = require('mongoose');

let complaintSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
  coordinate: mongoose.ObjectId,
  createdAt: { type: Date, default: Date.now },
  liked: Number
});

module.exports = mongoose.model('complaint', complaintSchema);