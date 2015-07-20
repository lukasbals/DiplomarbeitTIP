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
  var sqlite3 = require("sqlite3").verbose();
  var db = new sqlite3.Database("balsDB.db");

  db.serialize(function() {

    db.all("SELECT * FROM Bike where name='Lukas'", function(err, rows) {
      //console.log(rows);
      var Msg = rows;
      res.send(Msg);
    });
  });
  db.close();
});

/* GET Tobias listing. */
router.get('/Tobias', function(req, res, next) {
  var sqlite3 = require("sqlite3").verbose();
  var db = new sqlite3.Database("balsDB.db");

  db.serialize(function() {

    db.all("SELECT * FROM Bike where name='Tobias'", function(err, rows) {
      //console.log(rows);
      var Msg = rows;
      res.send(Msg);
    });
  });
  db.close();
});

/* GET Luca listing. */
router.get('/Sebastian', function(req, res, next) {
  var sqlite3 = require("sqlite3").verbose();
  var db = new sqlite3.Database("balsDB.db");

  db.serialize(function() {

    db.all("SELECT * FROM Bike where name='Sebastian'", function(err, rows) {
      //console.log(rows);
      var Msg = rows;
      res.send(Msg);
    });
  });
  db.close();
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
