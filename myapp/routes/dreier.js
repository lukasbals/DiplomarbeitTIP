var express = require('express');
var router = express.Router();

/* GET dreier1111 listing. */
router.get('/1', function(req, res, next) {
  var text = '{ "employees" : [' +
    '{ "firstName":"Luca" , "lastName":"1111" } ]}';
  var Msg = JSON.parse(text);
  res.send(Msg);
});

/* GET Dreier2222 listing. */
router.get('/2', function(req, res, next) {
  var text = '{ "employees" : [' +
    '{ "firstName":"Luca" , "lastName":"2222" } ]}';
  var Msg = JSON.parse(text);
  res.send(Msg);
});

module.exports = router;
