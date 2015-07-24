var express = require('express');
var router = express.Router();

/* GET geschaeftspartner page. */
router.get('/', function(req, res, next) {
  res.render('geschaeftspartner', { title: 'Geschaeftspartner' });
});

module.exports = router;
