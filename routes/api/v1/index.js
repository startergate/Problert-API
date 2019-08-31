const express = require('express');
const router = express.Router();

const controller = require('./v1.controller');




router.post('/issue', controller.newIssue);

router.get('/issue/:issueid', controller.getIssue);

router.put('/issue/:issueid/public', controller.tooglePublic);

router.delete('/issue/:issueid/deactivate', controller.deactivate);

router.put('/issue/:issueid/like', controller.addLike);

router.delete('/issue/:issueid/like/remove', controller.removeLike);

router.get('/issue/geo/:lat/:lng', controller.getIssueWithGeo);

router.get('/issue/geo/:lat/:lng/:rad', controller.getIssueWithGeo);

router.get('/issue/loc/:localid', controller.getIssueWithLoc);

router.post('/upload/image', controller.uploadImage);

module.exports = router;