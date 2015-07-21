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

  // http.get("http://10.20.50.53/TIP/api/DM360/Geschaeftspartner/Geschaeftspartner")
  //   .success(function(data) {
  //     console.log(data);
  //   })
  //   .error(function(data) {
  //     console.log("error");
  //   });


  http.get("http://10.20.50.53/TIP/api/DM360/Geschaeftspartner/Geschaeftspartner/", function(res) {
    var body = '';

    res.on('data', function(chunk) {
        body += chunk;
    });

    res.on('end', function() {
        var tipData = JSON.parse(body)
        console.log("Got response: ", tipData);
        //res.send(tipData);
    });
  });
});

module.exports = router;
