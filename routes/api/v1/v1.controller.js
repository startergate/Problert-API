const mongoose = require('mongoose');



const mongoUser = require('modules/userGetter');

const connection = mongoose.connect(`mongodb://${mongoUser.id}:${mongoUser.pw}@db.donote.co/problert?authSource=admin`, { useNewUrlParser: true }).then(() => {

}).catch(err => {
  console.error(err);
});

const Complaint = require('models/complaint');

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
      "coordinates": [parseFloat(req.body.lng), parseFloat(req.body.lat)]
    }
  });

  complaint.save(err => {
    if (err) {
      console.error(err);
      res.send({ "success": false});
      return;
    }
    res.send({
      "success": true,
      "issueid": issueid
    });
  });
};

exports.getIssue = (req, res, next) => {
  Complaint.findOne({"issueid": req.params.issueid}, {
    _id: 0,
    __v: 0
  }, (err, complaint) => {
    if (err) {
      console.error(err);
      res.send({ "success": false });
      return;
    }
    res.send({ "success": true, "complaint": complaint });
  });
};

exports.addLike = async (req, res, next) => {
  let result = await Complaint.updateOne({"issueid": req.params.issueid}, { $inc: {liked: 1} });
  if (result.nModified) res.send({ success: true });
  else res.send({ success: false });
};

exports.getIssueWithGeo = (req, res, next) => {
  let rad = 25;
  if (req.params.rad) rad = parseFloat(req.params.rad);

  Complaint.find({
    "coordinate": { $geoWithin: { $centerSphere: [ [ parseFloat(req.params.lng), parseFloat(req.params.lat) ], rad / 6371 ] } }
  }, {
    _id: 0,
    __v: 0
  }, (err, complaints) => {
    if (err) {
      console.error(err);
      res.status(400).send({ "success": false });
      return;
    }
    if (!req.query.dataOnly) {
      res.send(complaints);
      return;
    }
    res.send({ "success": true, "complaints": complaints });
  });
};

exports.uploadImage = (req, res, next) => {


  res.send({
    success: true,
    image: 'imageid'
  });
};