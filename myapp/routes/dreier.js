var express = require('express');
var router = express.Router();

/* GET dreier1111 listing. */
router.get('/1', function(req, res, next) {
  res.send('dreier1111!');
});

/* GET Dreier2222 listing. */
router.get('/2', function(req, res, next) {
  res.send('dreier2222!');
});

router.get('/', function(req, res, next) {
  res.render('dreier', {
    title: 'Express'
  });
});


module.exports = router;
