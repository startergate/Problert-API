const express = require('express');

const controller = require('./manage.controller');

const router = express.Router();

router.all('/', controller.index);

router.all('/:localid', controller.manage);

module.exports = router;