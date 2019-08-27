const express = require('express');
const router = express.Router();

const controller = require('./v1.controller');

router.post('/issue', controller.newIssue);

router.get('/issue/:issueid', controller.getIssue);

router.put('/issue/:issueid/like', controller.addLike);

router.get('/issue/geo/:lat/:lon', controller.getIssueWithGeo);

router.get('/issue/geo/:lat/:lon/:rad', controller.getIssueWithGeo);

router.post('/upload/image', controller.uploadImage);

module.exports = router;