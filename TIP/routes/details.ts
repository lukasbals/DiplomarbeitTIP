import sqlite3 = require("sqlite3");
var express = require('express');
var router = express.Router();


router.get("/", function(req, res, next) {
  //var id = req.param("id");
  //console.log(id);
  res.render("details", { title: "Details" });
});

router.post('/getDetails', function(req, res) {
  var id: number = req.body.id;
  var table: string = req.body.table;
  console.log(table, id);
  var db = new sqlite3.Database("db.sql");
  db.serialize((): void => {

    //console.log(tblName);
    db.all("select * from '" + table + "' where id = " + id + ";", (err, req): void => {
      //console.log(req);
      if (req != null) {
        res.send(req);
      } else {
        console.log("Es ist ein Fehler aufgetreten.")
      }

    });
  });
});

module.exports = router;
