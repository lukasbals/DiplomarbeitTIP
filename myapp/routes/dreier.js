var express = require('express');
var router = express.Router();

/* GET dreier1111 listing. */
router.get('/1', function(req, res, next) {
  var text = '[{"firstName":"Luca","lastName":"11111"}, {"firstName":"Tobias","lastName":"123"}, {"firstName":"Lukas","lastName":"14435354"}]';
  var Msg = JSON.parse(text);
  res.send(Msg);
});

/* GET Dreier2222 listing. */
router.get('/2', function(req, res, next) {
  var text = '[{ "firstName":"Luca" , "lastName":"2222" }]';
  var Msg = JSON.parse(text);
  res.send(Msg);
});

module.exports = router;
