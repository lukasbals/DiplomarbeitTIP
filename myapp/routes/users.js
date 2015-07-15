var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('users', {
    title: 'Express'
  });
});

/* GET Lukas listing. */
router.get('/Lukas', function(req, res, next) {
  var text = '[{"tour":"Hittisau","length":"22"}, {"tour":"Riefensberg","length":"12"}, {"tour":"Lingenau","length":"54"}]';
  var Msg = JSON.parse(text);
  res.send(Msg);
});

/* GET Tobias listing. */
router.get('/Tobias', function(req, res, next) {
  var text = '[{"tour":"Schwarzenberg","length":"32"}, {"tour":"Egg","length":"23"}, {"tour":"Dornbirn","length":"54"}]';
  var Msg = JSON.parse(text);
  res.send(Msg);
});

/* GET Luca listing. */
router.get('/Luca', function(req, res, next) {
  var text = '[{"tour":"Dornbirn","length":"22"}, {"tour":"Hard","length":"12"}, {"tour":"Bregenz","length":"54"}]';
  var Msg = JSON.parse(text);
  res.send(Msg);
});

module.exports = router;
