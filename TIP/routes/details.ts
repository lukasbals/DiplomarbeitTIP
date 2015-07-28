import sqlite3 = require("sqlite3");
var express = require('express');
var router = express.Router();


router.get("/", function(req, res, next) {
  //var id = req.param("id");
  //console.log(id);
  res.render("details", { title: "Details" });
});

module.exports = router;
