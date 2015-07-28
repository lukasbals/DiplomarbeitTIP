var express = require('express');
var router = express.Router();

/* GET details page. */
router.get('/', function(req, res) {
  var id = req.param("id");
  console.log(id);
  res.render('details');
});

module.exports = router;
