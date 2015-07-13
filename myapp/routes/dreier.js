var express = require('express');
var router = express.Router();

/* GET dreier listing. */
router.get('/1', function(req, res, next) {
  res.send('dreier1111!');
});

/* GET dreier listing. */
router.get('/2', function(req, res, next) {
  res.send('dreier2222!');
});

module.exports = router;
