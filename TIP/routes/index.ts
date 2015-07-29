var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'M.I.E.' });
});

router.get("/geschaeftspartner", function(req, res, next) {
  res.render("geschaeftspartner", { title: "Geschäftspartner" });
});

router.get("/person", function(req, res, next) {
  res.render("person", { title: "Personen" });
});

module.exports = router;
