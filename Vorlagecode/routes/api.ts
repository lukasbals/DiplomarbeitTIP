import express = require("express");
import request = require("request");
import sqlite3 = require("sqlite3");

var db = new sqlite3.Database("db.sql");
var router = express.Router();

router.get("/anrede", (req, res): void => {
  var result = new Array();

  db.serialize((): void => {
    db.each("select code, bezeichnung from anrede", (error, row): void => {
      result.push({
        Code: row.code,
        Bezeichnung: row.bezeichnung
      });
    }, (): void => {
        res.json(result);
      });
  });
});

var initDB = (): void => {
  db.serialize((): void => {
    db.run("create table if not exists anrede (code text, bezeichnung text)");
    db.run("create table if not exists geschaeftspartner_st ( " +
      "id integer primary key asc, " +
      "gp_nummer integer, " +
      "code_gpkz text, " +
      "firmenbez1 text, " +
      "firmenbez2 text, " +
      "firmenbez3 text, " +
      "strasse text, " +
      "code_land text, " +
      "plz text, " +
      "ort text, " +
      "telefon text, " +
      "fax text, " +
      "email text, " +
      "homepage text)");
  });
}
var loadAnrede = (): void => {
  request.get(
    "http://10.20.50.53/tip/api/DM360/Stammdaten/Anrede",
    (error, response, body: string): void => {
      var data: any[] = JSON.parse(body);

      db.serialize((): void => {
        data.forEach((val: any): void => {
          db.get("select count(*) as result from anrede where code = ?", [val.Code], (error, row): void => {
            if (row.result > 0) {
              db.run("update anrede set bezeichnung = ? where code = ?", [val.Bezeichnung, val.Code]);
            } else {
              db.run("insert into anrede (code, bezeichnung) values (?, ?)", [val.Code, val.Bezeichnung]);
            }
          });
        });
      });
    });
};
var loadGeschaeftspartner = (): void => {
  request.get(
    "http://10.20.50.53/tip/api/DM360/Stammdaten/Geschaeftspartner",
    (error, response, body: string): void => {
      var data: any[] = JSON.parse(body);

      db.serialize((): void => {
        var insertStmt = db.prepare("insert into geschaeftspartner_st (id, gp_nummer, code_gpkz, firmenbez1, firmenbez2, firmenbez3, strasse, code_land, plz, ort, telefon, fax, email, homepage) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        var updateStmt = db.prepare("update geschaeftspartner_st set gp_nummer = ?, code_gpkz = ?, firmenbez1 = ?, firmenbez2 = ?, firmenbez3 = ?, strasse = ?, code_land = ?, plz = ?, ort = ?, telefon = ?, fax = ?, email = ?, homepage = ? where id = ?");

        var insertCount = 0;
        var updateCount = 0;

        data.forEach((val: any): void => {
          db.get("select count(*) as result from geschaeftspartner_st where id = ?", [val.Id], (error, row): void => {
            if (row.result > 0) {
              updateCount++;
              updateStmt.run([val.GpNummer, val.CodeGpKz, val.Firmenbez1, val.Firmenbez2, val.Firmenbez3, val.Strasse, val.CodeLand, val.Plz, val.Ort, val.Telefon, val.Fax, val.Email, val.Homepage, val.Id]);
            } else {
              insertCount++;
              insertStmt.run([val.Id, val.GpNummer, val.CodeGpKz, val.Firmenbez1, val.Firmenbez2, val.Firmenbez3, val.Strasse, val.CodeLand, val.Plz, val.Ort, val.Telefon, val.Fax, val.Email, val.Homepage]);
            }
          });
        });

        if (insertCount > 0) {
          insertStmt.finalize();
        }
        if (updateCount > 0) {
          updateStmt.finalize();
        }
      });
    });
};

initDB();
loadAnrede();
loadGeschaeftspartner();

module.exports = router;
