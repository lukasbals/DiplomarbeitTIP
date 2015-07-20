var express = require('express');
var router = express.Router();
var http = require("http");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.get("/data", function(req, res, next) {
  console.log("IN");


  http.get("http://10.20.50.53/TIP/api/DM360/Geschaeftspartner/Geschaeftspartner", function(body) {
    console.log(body);
  });
});

module.exports = router;
