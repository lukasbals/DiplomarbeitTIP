var request = require("request");
var TIPDatabase = require("../my_modules/TIPDatabase");
var TIP;
(function (TIP) {
    var TIPDataVertreterBesuchPlanClass = (function () {
        function TIPDataVertreterBesuchPlanClass() {
            this.isActive = false;
        }
        TIPDataVertreterBesuchPlanClass.prototype.doSync = function () {
            this.isActive = true;
            this.initTable();
            this.loadTable();
        };
        TIPDataVertreterBesuchPlanClass.prototype.initTable = function () {
            TIPDatabase.getDB().run("create table if not exists besuche_plan (" +
                "client_id INTEGER PRIMARY KEY, " +
                "id int, " +
                "client_id_tour_plan int, " +
                "id_tour_plan int, " +
                "id_geschaeftspartner int, " +
                "von date, " +
                "is_deleted int, " +
                "is_changed int, " +
                "bis date, " +
                "status int);");
        };
        TIPDataVertreterBesuchPlanClass.prototype.loadTable = function () {
            var _this = this;
            console.log("In TIPDataVertreterBesuchPlan -- loadVertreterBesuchPlan");
            var date = new Date();
            request.get("http://10.20.50.53/tip/" + "api/DM360/Vertreter/BesuchPlan", function (error, response, body) {
                var data = JSON.parse(body);
                TIPDatabase.getDB().serialize(function () {
                    var insertStmt = TIPDatabase.getDB().prepare("insert into besuche_plan (id, client_id_tour_plan, id_tour_plan, id_geschaeftspartner, von, bis, status, is_deleted, is_changed) values (?, ?, ?, ?, ?, ?, ?, ? ,?)");
                    var updateStmt = TIPDatabase.getDB().prepare("update besuche_plan set client_id_tour_plan = ?, id_tour_plan = ?, id_geschaeftspartner = ?, von = ?, bis = ?, status = ? , is_deleted = ?, is_changed = ? where id = ?");
                    var insertCount = 0;
                    var updateCount = 0;
                    data.forEach(function (val) {
                        TIPDatabase.getDB().get("select count(*) as result from besuche_plan where id = ?", [val.Id], function (error, row) {
                            if (row.result > 0) {
                                updateCount++;
                                updateStmt.run([val.ClientIdTourPlan, val.IdTourPlan, val.IdGeschaeftspartner, val.Von, val.Bis, val.Status, val.IsDeleted, val.IsChanged, val.Id]);
                            }
                            else {
                                insertCount++;
                                insertStmt.run([val.Id, val.ClientIdTourPlan, val.IdTourPlan, val.IdGeschaeftspartner, val.Von, val.Bis, val.Status, val.IsDeleted, val.IsChanged]);
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
            var tblName = "besuche_plan";
            TIPDatabase.setSYNCH(tblName, date);
        };
        TIPDataVertreterBesuchPlanClass.prototype.isSyncActive = function () {
            return this.isActive;
        };
        TIPDataVertreterBesuchPlanClass.prototype.getJsonBesuchPlan = function (res) {
            var result = new Array();
            TIPDatabase.getDB().serialize(function () {
                TIPDatabase.getDB().each("select gp.firmenbez_1, bp.id, bp.von, bp.bis, bp.client_id, bp.id_geschaeftspartner from besuche_plan bp left join geschaeftspartner_st gp on bp.id_geschaeftspartner = gp.id where is_deleted = 0;", function (error, row) {
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
        TIPDataVertreterBesuchPlanClass.prototype.deleteBesuchPlanAppointment = function (id, res) {
            TIPDatabase.getDB().run("update besuche_plan set is_deleted = 1 where client_id = ?;", [id], function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.send("OK");
                }
            });
        };
        TIPDataVertreterBesuchPlanClass.prototype.updateBesuchPlanAppointment = function (updateBesuchPlanAppointmentData, res) {
            var data = updateBesuchPlanAppointmentData;
            var x = new Date(data.startDate.toLocaleString());
            var y = new Date(data.endDate.toLocaleString());
            var sD = x.toISOString();
            var eD = y.toISOString();
            TIPDatabase.getDB().run("update besuche_plan set is_changed = 1, von = ?, bis = ?, id_geschaeftspartner = ? where client_id = ?;", [sD, eD, data.IdGeschaeftspartner, data.ClientId], function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.send("OK");
                }
            });
        };
        TIPDataVertreterBesuchPlanClass.prototype.saveBesuchPlanAppointment = function (saveBesuchPlanAppointmentData, res) {
            var data = saveBesuchPlanAppointmentData;
            var x = new Date(data.startDate.toLocaleString());
            var y = new Date(data.endDate.toLocaleString());
            var sD = x.toISOString();
            var eD = y.toISOString();
            var IsDeleted = 0;
            var IsChanged = 1;
            var Status = 1;
            TIPDatabase.getDB().run("insert into besuche_plan (von, bis, id_geschaeftspartner, is_deleted, is_changed,status) values (?, ?, ?, ?, ?, ?);", [sD, eD, data.IdGeschaeftspartner, IsDeleted, IsChanged, Status], function (err) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send("OK");
                }
            });
        };
        TIPDataVertreterBesuchPlanClass.prototype.getDetailBesuchPlan = function (id, res) {
            var result = new Array();
            console.log(id);
            TIPDatabase.getDB().serialize(function () {
                TIPDatabase.getDB().each("select bp.client_id, bp.id, bp.id_tour_plan, bp.client_id_tour_plan, bp.id_geschaeftspartner, bp.von, bp.bis, bp.status, bp.is_deleted, bp.is_changed, gp.gp_nummer, gp.code_gpkz, gp.firmenbez_1, gp.firmenbez_2, gp.firmenbez_3, gp.strasse, gp.code_land, gp.plz, gp.ort, gp.telefon, gp.fax, gp.email, gp.homepage from besuche_plan bp left join geschaeftspartner_st gp on bp.id_geschaeftspartner = gp.id where bp.client_id = ?;", [id], function (err, row) {
                    result.push({
                        ClientId: row.client_id,
                        Id: row.id,
                        IdTourPlan: row.id_tour_plan,
                        ClientIdTourPlan: row.client_id_tour_plan,
                        IdGeschaeftspartner: row.id_geschaeftspartner,
                        startDate: row.von,
                        endDate: row.bis,
                        Status: row.status,
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
                        Homepage: row.homepage
                    });
                }, function () {
                    console.log(result);
                    res.json(result);
                });
            });
        };
        return TIPDataVertreterBesuchPlanClass;
    })();
    TIP.TIPDataVertreterBesuchPlanClass = TIPDataVertreterBesuchPlanClass;
})(TIP || (TIP = {}));
module.exports = new TIP.TIPDataVertreterBesuchPlanClass();
