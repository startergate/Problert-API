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
    "issueid": "issueid"
  });
};

exports.getIssue = (req, res, next) => {

  res.send({
    success: true,
    issue: {
      title: "뭐가 어째요",
      image: 'imageid',
      description: "뭐가 어째서 저째요",
      coordinate: {
        lat: 35.1427007,
        lon: 126.8000231
      }
    }
  });
};

exports.addLike = (req, res, next) => {
  res.send({
    success: true
  })
};

exports.getIssueWithGeo = (req, res, next) => {
  if (req.params.rad)

  res.send({
    success: true,
    issues: ['issueid1', 'issueid1', 'issueid1', 'issueid1', 'issueid1']
  });
};

exports.uploadImage = (req, res, next) => {
  res.send({
    success: true,
    image: 'imageid'
  });
};