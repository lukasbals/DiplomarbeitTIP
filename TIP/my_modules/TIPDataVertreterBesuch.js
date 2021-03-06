var request = require("request");
var TIPDatabase = require("../my_modules/TIPDatabase");
var TIP;
(function (TIP) {
    var TIPDataVertreterBesuchClass = (function () {
        function TIPDataVertreterBesuchClass() {
            this.isActive = false;
        }
        TIPDataVertreterBesuchClass.prototype.doSync = function () {
            this.isActive = true;
            this.initTable();
            this.loadTable();
        };
        TIPDataVertreterBesuchClass.prototype.initTable = function () {
            TIPDatabase.getDB().run("create table if not exists besuche (" +
                "client_id INTEGER PRIMARY KEY, " +
                "id int, " +
                "id_besuchstyp int, " +
                "client_id_besuch_plan int, " +
                "id_besuch_plan int, " +
                "id_geschaeftspartner int, " +
                "is_deleted int, " +
                "is_changed int, " +
                "von date, " +
                "bis date)");
        };
        TIPDataVertreterBesuchClass.prototype.loadTable = function () {
            var _this = this;
            console.log("In TIPDataVertreterBesuch -- loadVertreterBesuch");
            var date = new Date();
            request.get("http://10.20.50.53/tip/api/DM360/Vertreter/Besuch", function (error, response, body) {
                var data = JSON.parse(body);
                TIPDatabase.getDB().serialize(function () {
                    var insertStmt = TIPDatabase.getDB().prepare("insert into besuche (id, id_besuchstyp, client_id_besuch_plan, id_besuch_plan, id_geschaeftspartner, is_deleted, is_changed, von, bis) values (?, ?, ?, ?, ?, ?, ?, ?, ?)");
                    var updateStmt = TIPDatabase.getDB().prepare("update besuche set id_besuchstyp = ?, client_id_besuch_plan = ?, id_besuch_plan = ?, id_geschaeftspartner = ?, is_deleted = ?, is_changed = ?, von = ?, bis = ? where id = ?");
                    var insertCount = 0;
                    var updateCount = 0;
                    data.forEach(function (val) {
                        TIPDatabase.getDB().get("select count(*) as result from besuche where id = ?", [val.Id], function (error, row) {
                            if (row.result > 0) {
                                updateCount++;
                                updateStmt.run([val.IdBesuchstyp, val.ClientIdBesuch, val.IdBesuch, val.IdGeschaeftspartner, val.IsDeleted, val.IsChanged, val.Von, val.Bis, val.Id]);
                            }
                            else {
                                insertCount++;
                                insertStmt.run([val.Id, val.IdBesuchstyp, val.ClientIdBesuch, val.IdBesuch, val.IdGeschaeftspartner, val.IsDeleted, val.IsChanged, val.Von, val.Bis]);
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
            var tblName = "besuche";
            TIPDatabase.setSYNCH(tblName, date);
        };
        TIPDataVertreterBesuchClass.prototype.synchBesuch = function (res) {
            TIPDatabase.getDB().serialize(function () {
                TIPDatabase.getDB().each("select client_id, id, id_besuchstyp, client_id_besuch_plan, id_besuch_plan, id_geschaeftspartner, von, bis, is_deleted, is_changed from besuche where is_changed = 1 or is_deleted = 1;", function (err, row) {
                    var json = new Array();
                    json.push({
                        ClientId: row.client_id,
                        Id: row.id,
                        IdBesuchstyp: row.id_besuchstyp,
                        ClientIdBesuchPlan: row.client_id_besuch_plan,
                        IdBesuchPlan: row.id_besuch_plan,
                        IdGeschaeftspartner: row.id_geschaeftspartner,
                        Von: row.von,
                        Bis: row.bis,
                        IsDeleted: row.is_deleted,
                        IsChanged: row.is_changed
                    });
                    console.log("Das ist eine ROW: --> ");
                    console.log(json[0]);
                    request.post({
                        headers: { "content-type": "application/json" },
                        url: "http://10.20.50.53/tip/api/DM360/Vertreter/Besuch",
                        body: json[0],
                        form: { key: 'value' }
                    }, function (err, res, req, body) {
                        console.log("Das ist ein BODY: --> ");
                        console.log(body);
                        console.log(err);
                        console.log(req);
                    });
                });
            }, function () {
                res.send("OK");
            });
        };
        TIPDataVertreterBesuchClass.prototype.isSyncActive = function () {
            return this.isActive;
        };
        TIPDataVertreterBesuchClass.prototype.getJsonBesuch = function (res) {
            var result = new Array();
            TIPDatabase.getDB().serialize(function () {
                TIPDatabase.getDB().each("select gp.firmenbez_1, b.von, b.bis, b.client_id, b.id_geschaeftspartner, b.id from besuche b left join geschaeftspartner_st gp on b.id_geschaeftspartner = gp.id where is_deleted = 0;", function (error, row) {
                    result.push({
                        text: row.firmenbez_1,
                        startDate: row.von,
                        endDate: row.bis,
                        ClientId: row.client_id,
                        IdGeschaeftspartner: row.id_geschaeftspartner,
                        Id: row.id
                    });
                }, function () {
                    res.json(result);
                });
            });
        };
        TIPDataVertreterBesuchClass.prototype.deleteBesuchAppointment = function (id, res) {
            TIPDatabase.getDB().run("update besuche set is_deleted = 1 where client_id = ?;", [id], function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.send("OK");
                }
            });
        };
        TIPDataVertreterBesuchClass.prototype.updateBesuchAppointment = function (updateBesuchAppointmentData, res) {
            var data = updateBesuchAppointmentData;
            var x = new Date(data.startDate.toLocaleString());
            var y = new Date(data.endDate.toLocaleString());
            var sD = x.toISOString();
            var eD = y.toISOString();
            console.log(data.idForUpdate);
            TIPDatabase.getDB().run("update besuche set is_changed = 1, von = ?, bis = ?, id_geschaeftspartner = ?, id_besuchstyp = ? where " + data.isOnServer + " = " + data.idForUpdate + ";", [sD, eD, data.IdGeschaeftspartner, data.IdBesuchstyp], function (err) {
                console.log("HEADINGCONTENT" + data.berichtHeadingContent);
                if (data.berichtHeadingContent != null) {
                    console.log(data.idForUpdate);
                    TIPDatabase.getDB().run("insert into berichte (" + data.isOnServer + "_besuch, titel, text, is_changed, is_deleted) values (?, ?, ?, ? ,?)", [data.idForUpdate, data.berichtHeadingContent, data.berichtContentContent, 1, 0]);
                }
                else {
                    console.log("keinNeuerBericht");
                }
            });
            res.send("OK");
        };
        TIPDataVertreterBesuchClass.prototype.saveBesuchAppointment = function (saveBesuchAppointmentData, res) {
            var data = saveBesuchAppointmentData;
            var x = new Date(data.startDate.toLocaleString());
            var y = new Date(data.endDate.toLocaleString());
            var sD = x.toISOString();
            var eD = y.toISOString();
            var IsDeleted = 0;
            var IsChanged = 1;
            TIPDatabase.getDB().serialize(function () {
                var stmt = TIPDatabase.getDB().prepare("insert into besuche (von, bis, id_geschaeftspartner, is_deleted, is_changed, id_besuchstyp) values (?, ?, ?, ?, ?, ?); select last_insert_rowid() from besuche;");
                stmt.run([sD, eD, data.IdGeschaeftspartner, IsDeleted, IsChanged, data.IdBesuchstyp], function () {
                    var id = stmt.lastID;
                    if (data.berichtHeadingContent != null) {
                        TIPDatabase.getDB().run("insert into berichte (client_id_besuch, titel, text, is_changed, is_deleted) values (?, ?, ?, ? ,?)", [id, data.berichtHeadingContent, data.berichtContentContent, IsChanged, IsDeleted]);
                    }
                    else {
                        console.log("keinNeuerBericht");
                    }
                });
                stmt.finalize();
                res.send("OK");
            });
        };
        TIPDataVertreterBesuchClass.prototype.getDetailBesuch = function (id, res) {
            var result = new Array();
            console.log(id);
            TIPDatabase.getDB().serialize(function () {
                TIPDatabase.getDB().each("select b.client_id, b.id, b.id_besuchstyp, b.client_id_besuch_plan, b.id_besuch_plan, b.id_geschaeftspartner, b.von, b.bis, b.is_deleted, b.is_changed, gp.gp_nummer, gp.code_gpkz, gp.firmenbez_1, gp.firmenbez_2, gp.firmenbez_3, gp.strasse, gp.code_land, gp.plz, gp.ort, gp.telefon, gp.fax, gp.email, gp.homepage, bt.bezeichnung from besuche b left join geschaeftspartner_st gp on b.id_geschaeftspartner = gp.id left join besuchstypen_st bt on b.id_besuchstyp = bt.id where b.client_id = ?;", [id], function (err, row) {
                    result.push({
                        ClientId: row.client_id,
                        Id: row.id,
                        IdBesuchstyp: row.id_besuchstyp,
                        ClientIdBesuchPlan: row.client_id_besuch_plan,
                        IdBesuchPlan: row.id_besuch_plan,
                        IdGeschaeftspartner: row.id_geschaeftspartner,
                        startDate: row.von,
                        endDate: row.bis,
                        IsDeleted: row.is_deleted,
                        IsChanged: row.is_changed,
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
                        Bezeichnung: row.bezeichnung
                    });
                }, function () {
                    console.log(result);
                    res.json(result);
                });
            });
        };
        return TIPDataVertreterBesuchClass;
    }());
    TIP.TIPDataVertreterBesuchClass = TIPDataVertreterBesuchClass;
})(TIP || (TIP = {}));
module.exports = new TIP.TIPDataVertreterBesuchClass();
