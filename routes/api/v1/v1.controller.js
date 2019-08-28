const mongoose = require('mongoose');

const mongoUser = require('../../../modules/userGetter');

const connection = mongoose.connect(`mongodb://${mongoUser.id}:${mongoUser.pw}@db.donote.co/problert?authSource=admin`, { useNewUrlParser: true }).then(() => {

}).catch(err => {
  console.error(err);
});

const Complaint = require('../../../models/complaint');

const randomString = (length) => {
  const character = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let randomStr = '';
  let loopNum = length;
  while (loopNum) {
    randomStr += character[Math.floor(Math.random() * character.length)];
    loopNum -= 1;
  }

  return randomStr;
};

exports.newIssue = (req, res, next) => {
  let issueid = randomString(64);
  let complaint = new Complaint({
    "issueid": issueid,
    "title": req.body.title,
    "image": req.body.image,
    "description": req.body.description,
    "coordinate": {
      "type": "Point",
      "coordinates": [35.1427007, 126.8000231]
    }
  });

  complaint.save(err => {
    if (err) {
      console.error(err);
      res.send({"success": false});
      return;
    }
    res.send({
      "success": true,
      "issueid": issueid
    });
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
    issues: [{
      title: "1",
      image: "11",
      description: "111",
      coordinate: {
        lat: 35.1427007,
        lon: 126.8000231
      }
    }, {
      title: "2",
      image: "22",
      description: "222",
      coordinate: {
        lat: 35.1427007,
        lon: 126.8000231
      }
    }, {
      title: "3",
      image: "33",
      description: "333",
      coordinate: {
        lat: 35.1427007,
        lon: 126.8000231
      }
    }, {
      title: "4",
      image: "44",
      description: "444",
      coordinate: {
        lat: 35.1427007,
        lon: 126.8000231
      }
    }, {
      title: "5",
      image: "55",
      description: "555",
      coordinate: {
        lat: 35.1427007,
        lon: 126.8000231
      }
    }]
  });
};

exports.uploadImage = (req, res, next) => {
  res.send({
    success: true,
    image: 'imageid'
  });
};