var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

/* GET data from database, table Teams */
router.get('/teams', function(req, res, next) {
  var sqlite3 = require("sqlite3").verbose();
  var db = new sqlite3.Database("balsDB.db");

  db.serialize(function() {
    db.all("SELECT rowid as id,  country, team FROM Teams;", function(err, rows) {
      //console.log(rows);
      var Msg = rows;
      console.log(Msg);
      res.send(Msg);
    });
  });
  db.close();
});

/* POST into database, table Teams */
router.post('/teams', function(req, res, next) {
  //console.log("IN");
  var team = req.body.team;
  var country = req.body.country;
  console.log(team + " : " + country);

  var sqlite3 = require("sqlite3").verbose();
  var db = new sqlite3.Database("balsDB.db");

  db.serialize(function() {
    db.run("create table if not exists Teams (team varchar(50), country varchar(50));");

    db.run("insert into Teams values ('" + team + "', '" + country + "')");
  });

  db.close();

  res.send("OK");
});

/* POST delete from database, table Teams */
router.post("/delete", function(req, res, next) {
  // console.log(req.body.idDelete);
  var idDelete = req.body.idDelete;
  console.log(idDelete);

  var sqlite3 = require("sqlite3").verbose();
  var db = new sqlite3.Database("balsDB.db");

  db.serialize(function() {
    db.run("delete from Teams where rowid = " + idDelete + "");
  });
  db.close();
  res.send("OK");
});

module.exports = router;
