const mongoose = require('mongoose');

let complaintSchema = new mongoose.Schema({
  type: { type: String, defalut: "complaint" },
  issueid: String,
  localid: { type: Number, default: 0 },
  title: String,
  image: { type: String, default: null },
  description: String,
  coordinate: Object,
  address: String,
  liked: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  isopen: { type: Boolean, default: true },
  ispublic: { type: Boolean, default: true }
});

module.exports = mongoose.model('complaint', complaintSchema);