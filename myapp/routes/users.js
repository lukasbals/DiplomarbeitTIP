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
router.get('/Sebastian', function(req, res, next) {
  var text = '[{"tour":"Dornbirn","length":"22"}, {"tour":"Hard","length":"12"}, {"tour":"Bregenz","length":"54"}]';
  var Msg = JSON.parse(text);
  res.send(Msg);
});

/* GET Luca listing. */
router.get('/data', function(req, res, next) {
  var sqlite3 = require("sqlite3").verbose();
  var db = new sqlite3.Database("balsDB.db");

  db.serialize(function() {

    db.all("SELECT rowid AS id, info FROM user_info", function(err, rows) {
      //console.log(rows);
      var Msg = rows;
      res.send(Msg);
    });
  });
  db.close();
});

module.exports = router;
