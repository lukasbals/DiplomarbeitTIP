var express = require('express');
var router = express.Router();

/* GET details page. */
router.post('/postDetails', function(req, res, next) {
  res.get('details', { title: 'M.I.E.' });
});

module.exports = router;
