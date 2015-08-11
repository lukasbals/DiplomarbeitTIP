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
                TIPDatabase.getDB().each("select gp.firmenbez_1, bp.von, bp.bis, bp.client_id, bp.id_geschaeftspartner from besuche_plan bp left join geschaeftspartner_st gp on bp.id_geschaeftspartner = gp.id where is_deleted = 0;", function (error, row) {
                    result.push({
                        text: row.firmenbez_1,
                        startDate: row.von,
                        endDate: row.bis,
                        ClientId: row.client_id,
                        IdGeschaeftspartner: row.id_geschaeftspartner
                    });
                }, function () {
                    res.json(result);
                });
            });
        };
        TIPDataVertreterBesuchPlanClass.prototype.deleteBesuchPlanAppointment = function (id, res) {
            TIPDatabase.getDB().run("update besuche_plan set is_deleted = 1 where client_id = ?;", [id]);
            res.send("OK");
        };
        TIPDataVertreterBesuchPlanClass.prototype.updateBesuchPlanAppointment = function (id, startDate, endDate, id_geschaeftspartner, res) {
            var sD = startDate.toLocaleString();
            var eD = endDate.toLocaleString();
            console.log("Hier wird gloggt!");
            console.log(id);
            console.log(sD);
            console.log(eD);
            console.log(id_geschaeftspartner);
            TIPDatabase.getDB().run("update besuche_plan set is_changed = 1, von = ?, bis = ?, id_geschaeftspartner = ? where id = ?", [sD, eD, id_geschaeftspartner, id]);
            res.send("OK");
        };
        return TIPDataVertreterBesuchPlanClass;
    })();
    TIP.TIPDataVertreterBesuchPlanClass = TIPDataVertreterBesuchPlanClass;
})(TIP || (TIP = {}));
module.exports = new TIP.TIPDataVertreterBesuchPlanClass();
