const mongoose = require('mongoose');

let complaintSchema = new mongoose.Schema({
  issueid: String,
  localid: { type: Number, default: 0 },
  title: String,
  image: String,
  description: String,
  coordinate: Object,
  liked: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  isopen: { type: Boolean, default: true },
  ispublic: { type: Boolean, default: true }
});

module.exports = mongoose.model('complaint', complaintSchema);