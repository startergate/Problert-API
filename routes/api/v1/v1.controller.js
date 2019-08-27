const mongoose = require('mongoose');

exports.newIssue = (req, res, next) => {
  let template = {
    title: "뭐가 어째요",
    image: 'imageid',
    description: "뭐가 어째서 저째요",
    coordinate: {
      lat: 35.1427007,
      lon: 126.8000231
    }
  };






  res.send({
    "success": true
  })
};

exports.getIssue = (req, res, next) => {

};

exports.addLike = (req, res, next) => {

};

exports.getIssueWithGeo = (req, res, next) => {

};