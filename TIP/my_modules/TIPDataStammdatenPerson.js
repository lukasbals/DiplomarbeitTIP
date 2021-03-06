var request = require("request");
var TIPDatabase = require("../my_modules/TIPDatabase");
var TIP;
(function (TIP) {
    var TIPDataStammdatenPersonClass = (function () {
        function TIPDataStammdatenPersonClass() {
            this.isActive = false;
        }
        TIPDataStammdatenPersonClass.prototype.doSync = function () {
            this.isActive = true;
            this.initTable();
            this.loadTable();
        };
        TIPDataStammdatenPersonClass.prototype.initTable = function () {
            TIPDatabase.getDB().run("create table if not exists personen_st ( " +
                "id int primary key, " +
                "id_geschaeftspartner int, " +
                "code_gruppe string(2), " +
                "code_anrede string(10), " +
                "titel string(50), " +
                "vorname string(50), " +
                "nachname string(50), " +
                "abteilung string(50), " +
                "telefon string(50), " +
                "mobil string(50), " +
                "fax string(50), " +
                "email string(50), " +
                "geburtsdatum date)");
        };
        TIPDataStammdatenPersonClass.prototype.loadTable = function () {
            var _this = this;
            console.log("In TIPDataStammdatenPerson -- loadPerson");
            var date = new Date();
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
                    _this.isActive = false;
                });
            });
            var tblName = "personen_st";
            TIPDatabase.setSYNCH(tblName, date);
        };
        TIPDataStammdatenPersonClass.prototype.isSyncActive = function () {
            return this.isActive;
        };
        TIPDataStammdatenPersonClass.prototype.getJsonPerson = function (res) {
            var result = new Array();
            TIPDatabase.getDB().serialize(function () {
                TIPDatabase.getDB().each("select id, id_geschaeftspartner, code_gruppe, code_anrede, titel, vorname, nachname, abteilung, telefon, mobil, fax, email, geburtsdatum from personen_st;", function (error, row) {
                    result.push({
                        Id: row.id,
                        IdGeschaeftspartner: row.id_geschaeftspartner,
                        CodePersonengruppe: row.code_gruppe,
                        CodeAnrede: row.code_anrede,
                        Titel: row.titel,
                        Vorname: row.vorname,
                        Nachname: row.nachname,
                        Abteilung: row.abteilung,
                        Telefon: row.telefon,
                        Mobil: row.mobil,
                        Fax: row.fax,
                        Email: row.email,
                        Geburtsdatum: row.Geburtsdatum
                    });
                }, function () {
                    res.json(result);
                });
            });
        };
        TIPDataStammdatenPersonClass.prototype.getDetailPerson = function (id, res) {
            var result = new Array();
            TIPDatabase.getDB().serialize(function () {
                TIPDatabase.getDB().each("select p.id, p.id_geschaeftspartner, p.code_gruppe, p.code_anrede, p.titel, p.vorname, p.nachname, p.abteilung, p.telefon, p.mobil, p.fax, p.email, p.geburtsdatum, pg.bezeichnung as gruppe, a.bezeichnung as anrede, gp.firmenbez_1 from personen_st p left join geschaeftspartner_st gp on p.id_geschaeftspartner = gp.id left join personengruppen_st pg on p.code_gruppe = pg.code left join anreden_st a on p.code_anrede = a.code where p.id =?;", [id], function (err, row) {
                    result.push({
                        Id: row.id,
                        IdGeschaeftspartner: row.id_geschaeftspartner,
                        CodePersonengruppe: row.code_gruppe,
                        CodeAnrede: row.code_anrede,
                        Titel: row.titel,
                        Vorname: row.vorname,
                        Nachname: row.nachname,
                        Abteilung: row.abteilung,
                        Telefon: row.telefon,
                        Mobil: row.mobil,
                        Fax: row.fax,
                        Email: row.email,
                        Geburtsdatum: row.Geburtsdatum,
                        Gruppe: row.gruppe,
                        Anrede: row.anrede,
                        Firmenbez1: row.firmenbez_1
                    });
                }, function () {
                    res.json(result);
                });
            });
        };
        TIPDataStammdatenPersonClass.prototype.getDetailPersonForGP = function (id, res) {
            var result = new Array();
            TIPDatabase.getDB().serialize(function () {
                TIPDatabase.getDB().each("select id, id_geschaeftspartner, code_gruppe, code_anrede, titel, vorname, nachname, abteilung, telefon, mobil, fax, email, geburtsdatum from personen_st where id_geschaeftspartner =?;", [id], function (err, row) {
                    result.push({
                        Id: row.id,
                        IdGeschaeftspartner: row.id_geschaeftspartner,
                        CodePersonengruppe: row.code_gruppe,
                        CodeAnrede: row.code_anrede,
                        Titel: row.titel,
                        Vorname: row.vorname,
                        Nachname: row.nachname,
                        Abteilung: row.abteilung,
                        Telefon: row.telefon,
                        Mobil: row.mobil,
                        Fax: row.fax,
                        Email: row.email,
                        Geburtsdatum: row.Geburtsdatum
                    });
                }, function () {
                    res.json(result);
                });
            });
        };
        return TIPDataStammdatenPersonClass;
    })();
    TIP.TIPDataStammdatenPersonClass = TIPDataStammdatenPersonClass;
})(TIP || (TIP = {}));
module.exports = new TIP.TIPDataStammdatenPersonClass();
