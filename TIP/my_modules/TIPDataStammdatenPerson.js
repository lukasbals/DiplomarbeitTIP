var request = require("request");
var TIPDatabase = require("../my_modules/TIPDatabase");
var loadPerson = function () {
    console.log("In TIPDataStammdatenPerson -- loadPerson");
    TIPDatabase.getDB().run("create table if not exists personen_st ( " +
        "id int primary key, " +
        "id_geschaeftspartner int, " +
        "code_gruppe string(2), " +
        "code_anrede string(10), " +
        "titel stirng(50), " +
        "vorname string(50), " +
        "nachname string(50), " +
        "abteilung string(50), " +
        "telefon string(50), " +
        "mobil string(50), " +
        "fax string(50), " +
        "email string(50), " +
        "geburtsdatum date)");
    request.get("http://10.20.50.53/tip/api/DM360/Stammdaten/Person", function (error, response, body) {
        var data = JSON.parse(body);
        TIPDatabase.getDB().serialize(function () {
            var insertStmt = TIPDatabase.getDB().prepare("insert into personen_st (id, id_geschaeftspartner, code_gruppe, code_anrede, titel, vorname, nachname, abteilung, telefon, mobil, fax, email, geburtsdatum) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            var updateStmt = TIPDatabase.getDB().prepare("update personen_st set id_geschaeftspartner = ?, code_gruppe = ?, code_anrede = ?, titel = ?, vorname = ?, nachname = ?, abteilung = ?, telefon = ?, mobil = ?, fax = ?, email = ?, geburtsdatum = ? where id = ?");
            var insertCount = 0;
            var updateCount = 0;
            data.forEach(function (val) {
                TIPDatabase.getDB().get("select count(*) as result from personen_st where id = ?", [val.Id], function (error, row) {
                    if (row.result > 0) {
                        updateCount++;
                        updateStmt.run([val.IdGeschaeftspartner, val.CodePersonengruppe, val.CodeAnrede, val.Titel, val.Vorname, val.Nachname, val.Abteilung, val.Telefon, val.Mobil, val.Fax, val.Email, val.Geburtsdatum, val.Id]);
                    }
                    else {
                        insertCount++;
                        insertStmt.run([val.Id, val.IdGeschaeftspartner, val.CodePersonengruppe, val.CodeAnrede, val.Titel, val.Vorname, val.Nachname, val.Abteilung, val.Telefon, val.Mobil, val.Fax, val.Email, val.Geburtsdatum]);
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
    var tblName = "personen_st";
    TIPDatabase.setSYNCH(tblName);
};
module.exports.loadPerson = loadPerson;