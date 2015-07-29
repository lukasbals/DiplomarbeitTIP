var express = require('express');
var router = express.Router();


router.get("/detailGeschaeftspartner", function(req, res, next) {
  res.render("detailGeschaeftspartner", { title: "Detail" });
});

module.exports = router;
