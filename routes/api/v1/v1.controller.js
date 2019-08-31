const mongoose = require('mongoose');
const axios = require('axios');

const setting = require('modules/setting');

const connection = mongoose.connect(`mongodb://${setting.id}:${setting.pw}@db.donote.co/problert?authSource=admin`, { useNewUrlParser: true })
  .catch(err => {
    console.error(err);
  });

const instance = axios.create({
  baseURL: 'https://dapi.kakao.com/v2/local/geo/',
  timeout: 10000,
  headers: {'Authorization': `KakaoAK ${setting.kakaoid}`}
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
  let lat = parseFloat(req.body.lat);
  let lng = parseFloat(req.body.lng);
  if (!(req.body.title && req.body.description)) {
    res.status(400).send({ "success": false});
  }
  instance.get(`/coord2regioncode.json`, {
    params: {
      x: lng,
      y: lat
    }
  }).then(response => {
    let localid;
    switch (response.data.documents[0].region_1depth_name) {
      case "서울특별시":
        localid = 0;
        break;
      case "부산광역시":
        localid = 1;
        break;
      case "대구광역시":
        localid = 2;
        break;
      case "인천광역시":
        localid = 3;
        break;
      case "광주광역시":
        localid = 4;
        break;
      case "대전광역시":
        localid = 5;
        break;
      case "울산광역시":
        localid = 6;
        break;
      case "세종특별자치시":
        localid = 7;
        break;
      case "경기도":
        localid = 8;
        break;
      case "강원도":
        localid = 9;
        break;
      case "충청북도":
        localid = 10;
        break;
      case "충청남도":
        localid = 11;
        break;
      case "전라북도":
        localid = 12;
        break;
      case "전라남도":
        localid = 13;
        break;
      case "경상북도":
        localid = 14;
        break;
      case "경상남도":
        localid = 15;
        break;
      case "제주특별자치도":
        localid = 16;
        break;
      default:
        res.sendStatus(400);
        return;
    }
    let issueid = randomString(64);
    let complaint = new Complaint({
      "issueid": issueid,
      "localid": localid,
      "title": req.body.title,
      "image": req.body.image,
      "description": req.body.description,
      "coordinate": {
        "type": "Point",
        "coordinates": [lng, lat]
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
  }).catch(err => {
    console.error(err);
  });
};

exports.getIssue = (req, res, next) => {
  Complaint.findOne({
    "issueid": req.params.issueid,
    "ispublic": true,
    "isopen": true
  }, {
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
    res.send(complaints);
    // res.send({ "success": true, "complaints": complaints });
  });
};

exports.getIssueWithLoc = (req, res, next) => {
  Complaint.find({
    "localid": req.params.localid
  }, {
    _id: 0,
    __v: 0
  }, (err, complaints) => {
    if (err) {
      console.error(err);
      res.status(400).send({ "success": false });
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