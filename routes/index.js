const express = require('express');
const router = express.Router();

const apiRouter = require('./api');
const manageRouter = require('./manage');

router.use('/api', apiRouter);

// router.use('/manage', manageRouter);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/manage');
});

module.exports = router;
