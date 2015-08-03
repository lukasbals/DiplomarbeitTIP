var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get("/geschaeftspartner", function(req, res, next) {
  res.render("geschaeftspartner");
});

router.get("/person", function(req, res, next) {
  res.render("person");
});

module.exports = router;
