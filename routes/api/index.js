const express = require('express');
const router = express.Router();

const v1Router = require('./v1');

const controller = require('./api.controller');

router.use('/v1', v1Router);

router.all('*', controller.error404);

module.exports = router;