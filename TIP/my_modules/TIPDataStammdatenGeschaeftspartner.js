var request = require("request");
var TIPDatabase = require("./TIPDatabase");
var TIP;
(function (TIP) {
    var TIPDataStammdatenGeschaeftspartnerClass = (function () {
        function TIPDataStammdatenGeschaeftspartnerClass() {
            this.isActive = false;
        }
        TIPDataStammdatenGeschaeftspartnerClass.prototype.doSync = function () {
            this.isActive = true;
            this.initTableGeschaeftspartner();
            this.loadGeschaeftspartner();
        };
        TIPDataStammdatenGeschaeftspartnerClass.prototype.initTableGeschaeftspartner = function () {
            TIPDatabase.getDB().run("create table if not exists geschaeftspartner_st ( " +
                "id integer primary key asc, " +
                "gp_nummer integer, " +
                "code_gpkz text, " +
                "firmenbez_1 text, " +
                "firmenbez_2 text, " +
                "firmenbez_3 text, " +
                "strasse text, " +
                "code_land text, " +
                "plz text, " +
                "ort text, " +
                "telefon text, " +
                "fax text, " +
                "email text, " +
                "homepage text)");
        };
        TIPDataStammdatenGeschaeftspartnerClass.prototype.loadGeschaeftspartner = function () {
            var _this = this;
            console.log("In TIPDataStammdatenGeschaeftspartner -- loadGeschaeftspartner");
            var date = new Date();
            request.get("http://10.20.50.53/tip/api/DM360/Stammdaten/Geschaeftspartner", function (error, response, body) {
                var data = JSON.parse(body);
                TIPDatabase.getDB().serialize(function () {
                    var insertStmt = TIPDatabase.getDB().prepare("insert into geschaeftspartner_st (id, gp_nummer, code_gpkz, firmenbez_1, firmenbez_2, firmenbez_3, strasse, code_land, plz, ort, telefon, fax, email, homepage) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                    var updateStmt = TIPDatabase.getDB().prepare("update geschaeftspartner_st set gp_nummer = ?, code_gpkz = ?, firmenbez_1 = ?, firmenbez_2 = ?, firmenbez_3 = ?, strasse = ?, code_land = ?, plz = ?, ort = ?, telefon = ?, fax = ?, email = ?, homepage = ? where id = ?");
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
                    _this.isActive = false;
                });
            });
            var tblName = "geschaeftspartner_st";
            TIPDatabase.setSYNCH(tblName, date);
        };
        TIPDataStammdatenGeschaeftspartnerClass.prototype.isSyncActive = function () {
            return this.isActive;
        };
        TIPDataStammdatenGeschaeftspartnerClass.prototype.getJsonGeschaeftspartner = function (res) {
            var result = new Array();
            try {
                TIPDatabase.getDB().serialize(function () {
                    TIPDatabase.getDB().each("select id, gp_nummer, code_gpkz, firmenbez_1, firmenbez_2, firmenbez_3, strasse, code_land, plz, ort, telefon, fax, email, homepage from geschaeftspartner_st;", function (error, row) {
                        result.push({
                            Id: row.id,
                            GpNummer: row.gp_nummer,
                            CodeGpKz: row.code_gpkz,
                            Firmenbez1: row.firmenbez_1,
                            Firmenbez2: row.firmenbez_2,
                            Firmenbez3: row.firmenbez_3,
                            Strasse: row.strasse,
                            CodeLand: row.code_land,
                            Plz: row.plz,
                            Ort: row.ort,
                            Telefon: row.telefon,
                            Fax: row.fax,
                            Email: row.email,
                            Homepage: row.homepage
                        });
                    }, function () {
                        res.json(result);
                    });
                });
            }
            catch (e) {
                console.log(e);
                console.log(TIPDatabase);
                console.log(TIPDatabase.getDB);
            }
        };
        TIPDataStammdatenGeschaeftspartnerClass.prototype.getDetailGeschaeftspartner = function (id, res) {
            var result = new Array();
            TIPDatabase.getDB().serialize(function () {
                TIPDatabase.getDB().each("select g.code_land, g.code_gpkz, g.id, l.bezeichnung as land, gp.bezeichnung as gpkz, g.email, g.fax, g.firmenbez_1, g.firmenbez_2, g.firmenbez_3, g.gp_nummer, g.homepage, l.is_eu, g.ort, g.plz, g.strasse, g.telefon from geschaeftspartner_st g left join laender_st l on g.code_land = l.code left join gpkz_st gp on g.code_gpkz = gp.code where g.id =?;", [id], function (err, row) {
                    result.push({
                        Id: row.id,
                        GpNummer: row.gp_nummer,
                        CodeGpKz: row.code_gpkz,
                        Firmenbez1: row.firmenbez_1,
                        Firmenbez2: row.firmenbez_2,
                        Firmenbez3: row.firmenbez_3,
                        Strasse: row.strasse,
                        CodeLand: row.code_land,
                        Plz: row.plz,
                        Ort: row.ort,
                        Telefon: row.telefon,
                        Fax: row.fax,
                        Email: row.email,
                        Homepage: row.homepage,
                        Land: row.land,
                        GpKz: row.gpkz,
                        IsEU: row.is_eu
                    });
                }, function () {
                    res.json(result);
                });
            });
        };
        TIPDataStammdatenGeschaeftspartnerClass.prototype.getDetailGeschaeftspartnerForPerson = function (id, res) {
            var result = new Array();
            TIPDatabase.getDB().serialize(function () {
                TIPDatabase.getDB().get("select id_geschaeftspartner from personen_st where id = ?", [id], function (err, row) {
                    var idGP = row.id_geschaeftspartner;
                    TIPDatabase.getDB().each("select g.code_land, g.code_gpkz, g.id, l.bezeichnung as land, gp.bezeichnung as gpkz, g.email, g.fax, g.firmenbez_1, g.firmenbez_2, g.firmenbez_3, g.gp_nummer, g.homepage, l.is_eu, g.ort, g.plz, g.strasse, g.telefon from geschaeftspartner_st g left join laender_st l on g.code_land = l.code left join gpkz_st gp on g.code_gpkz = gp.code where g.id =?;", [idGP], function (err, row) {
                        result.push({
                            Id: row.id,
                            GpNummer: row.gp_nummer,
                            CodeGpKz: row.code_gpkz,
                            Firmenbez1: row.firmenbez_1,
                            Firmenbez2: row.firmenbez_2,
                            Firmenbez3: row.firmenbez_3,
                            Strasse: row.strasse,
                            CodeLand: row.code_land,
                            Plz: row.plz,
                            Ort: row.ort,
                            Telefon: row.telefon,
                            Fax: row.fax,
                            Email: row.email,
                            Homepage: row.homepage,
                            Land: row.land,
                            GpKz: row.gpkz,
                            IsEU: row.is_eu
                        });
                    }, function () {
                        res.json(result);
                    });
                });
            });
        };
        return TIPDataStammdatenGeschaeftspartnerClass;
    })();
    TIP.TIPDataStammdatenGeschaeftspartnerClass = TIPDataStammdatenGeschaeftspartnerClass;
})(TIP || (TIP = {}));
module.exports = new TIP.TIPDataStammdatenGeschaeftspartnerClass();
