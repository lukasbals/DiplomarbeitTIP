var request = require("request");
var TIPDatabase = require("../my_modules/TIPDatabase");
var loadGeschaeftspartner = function () {
    console.log("In TIPDataStammdatenGeschaeftspartner -- loadGeschaeftspartner");
    var date = new Date();
    TIPDatabase.getDB().run("create table if not exists geschaeftspartner_st ( " +
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
    request.get("http://10.20.50.53/tip/api/DM360/Stammdaten/Geschaeftspartner", function (error, response, body) {
        var data = JSON.parse(body);
        TIPDatabase.getDB().serialize(function () {
            var insertStmt = TIPDatabase.getDB().prepare("insert into geschaeftspartner_st (id, gp_nummer, code_gpkz, firmenbez1, firmenbez2, firmenbez3, strasse, code_land, plz, ort, telefon, fax, email, homepage) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            var updateStmt = TIPDatabase.getDB().prepare("update geschaeftspartner_st set gp_nummer = ?, code_gpkz = ?, firmenbez1 = ?, firmenbez2 = ?, firmenbez3 = ?, strasse = ?, code_land = ?, plz = ?, ort = ?, telefon = ?, fax = ?, email = ?, homepage = ? where id = ?");
            var insertCount = 0;
            var updateCount = 0;
            data.forEach(function (val) {
                TIPDatabase.getDB().get("select count(*) as result from geschaeftspartner_st where id = ?", [val.Id], function (error, row) {
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
    var tblName = "geschaeftspartner_st";
    TIPDatabase.setSYNCH(tblName, date);
};
module.exports.loadGeschaeftspartner = loadGeschaeftspartner;
