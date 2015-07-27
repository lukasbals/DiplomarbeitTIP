var express = require('express');
var router = express.Router();

/* GET geschaeftspartner page. */
router.post('/', function(req, res, next) {
  console.log("IN");
  res.render('geschaeftspartner', { title: 'Geschaeftspartner' });
});

module.exports = router;
