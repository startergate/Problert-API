exports.index = (req, res, next) => {
  res.redirect('/manage/0');
};

exports.manage = (req, res, next) => {
  res.render('manage', { 'localid': req.params.localid });
};