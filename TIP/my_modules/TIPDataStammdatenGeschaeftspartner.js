var express = require("express");
var sqlite3 = require("sqlite3");
var request = require("request");
var db = new sqlite3.Database("db.sql");
var router = express.Router();
var loadGeschaeftspartner = function () {
    console.log("In TIPDataStammdatenGeschaeftspartner -- loadGeschaeftspartner");
    request.get("http://10.20.50.53/tip/api/DM360/Stammdaten/Geschaeftspartner", function (error, response, body) {
        var data = JSON.parse(body);
        db.serialize(function () {
            var insertStmt = db.prepare("insert into geschaeftspartner_st (id, gp_nummer, code_gpkz, firmenbez1, firmenbez2, firmenbez3, strasse, code_land, plz, ort, telefon, fax, email, homepage) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            var updateStmt = db.prepare("update geschaeftspartner_st set gp_nummer = ?, code_gpkz = ?, firmenbez1 = ?, firmenbez2 = ?, firmenbez3 = ?, strasse = ?, code_land = ?, plz = ?, ort = ?, telefon = ?, fax = ?, email = ?, homepage = ? where id = ?");
            var insertCount = 0;
            var updateCount = 0;
            data.forEach(function (val) {
                db.get("select count(*) as result from geschaeftspartner_st where id = ?", [val.Id], function (error, row) {
                    if (row.result > 0) {
                        updateCount++;
                        updateStmt.run([val.GpNummer, val.CodeGpKz, val.Firmenbez1, val.Firmenbez2, val.Firmenbez3, val.Strasse, val.CodeLand, val.Plz, val.Ort, val.Telefon, val.Fax, val.Email, val.Homepage, val.Id]);
                    }
                    else {
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
module.exports.loadGeschaeftspartner = loadGeschaeftspartner;
