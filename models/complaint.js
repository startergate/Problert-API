const mongoose = require('mongoose');

let complaintSchema = new mongoose.Schema({
  issueid: String,
  title: String,
  image: String,
  description: String,
  coordinate: Object,
  createdAt: { type: Date, default: Date.now },
  liked: { type: Number, default: 0 }
});

module.exports = mongoose.model('complaint', complaintSchema);