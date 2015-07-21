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

  http.get("http://10.20.50.53/TIP/api/DM360/Geschaeftspartner/Geschaeftspartner/", function(data) {
    var body = '';

    data.on('data', function(chunk) {
      body += chunk;
    });

    data.on('end', function() {
      var tipData = JSON.parse(body)
        //console.log("Got response: ", tipData);

      var sqlite3 = require("sqlite3").verbose();
      var db = new sqlite3.Database("devextremeDB");

      db.serialize(function() {
        db.run("create table if not exists Geschaeftspartner (Id int PRIMARY KEY, GpNummer long, CodeGpKz string(6), Firmenbez1 string(254), Firmenbez2 string(254), Firmenbez3 string(254), Strasse string(254), CodeLand string(3), Plz string(10), Ort string(254), Telefon string(50), Fax string(50), Email string(100), Homepage string(100));");

        db.run("delete from Geschaeftspartner");

        var count = 0;
        var i = true;
        while (i == true) {
          if (tipData[count] != null) {
            console.log(tipData);
            db.run("insert into Geschaeftspartner (Id, GpNummer, CodeGpKz, Firmenbez1, Firmenbez2, Firmenbez3, Strasse, CodeLand, Plz, Ort, Telefon, Fax, Email, Homepage) values ("
              + tipData[count].Id + ", "
              + tipData[count].GpNummer + ", '"
              + tipData[count].CodeGpKz + "', '"
              + tipData[count].Firmenbez1 + "', '"
              + tipData[count].Firmenbez2 + "', '"
              + tipData[count].Firmenbez3 + "', '"
              + tipData[count].Strasse + "', '"
              + tipData[count].CodeLand + "', '"
              + tipData[count].Plz + "', '"
              + tipData[count].Ort + "', '"
              + tipData[count].Telefon + "', '"
              + tipData[count].Fax + "', '"
              + tipData[count].Email + "', '"
              + tipData[count].Homepage + "');");
          } else {
            i = false;
          }
          count++;
        }
      });

      db.close();


      res.send(tipData);


    });

  });
});

module.exports = router;
