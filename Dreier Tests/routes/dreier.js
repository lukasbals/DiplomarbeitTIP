var express = require('express');
var router = express.Router();

/* GET dreier1111 listing. */
router.get('/1', function(req, res, next) {
  res.render('dreier',{
    title: 'Express'
  });
});

/* GET Dreier2222 listing. */
router.get('/2', function(req, res, next) {
  res.send('dreier2222!');
});

module.exports = router;