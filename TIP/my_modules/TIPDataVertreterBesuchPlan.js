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
                "client_id int primary key, " +
                "id int, " +
                "client_id_tour_plan int, " +
                "id_tour_plan int, " +
                "id_geschaeftspartner int, " +
                "von date, " +
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
                    var insertStmt = TIPDatabase.getDB().prepare("insert into besuche_plan (client_id, id, client_id_tour_plan, id_tour_plan, id_geschaeftspartner, von, bis, status) values (?, ?, ?, ?, ?, ?, ?, ?)");
                    var updateStmt = TIPDatabase.getDB().prepare("update besuche_plan set id = ?, client_id_tour_plan = ?, id_tour_plan = ?, id_geschaeftspartner = ?, von = ?, bis = ?, status = ? where client_id = ?");
                    var insertCount = 0;
                    var updateCount = 0;
                    data.forEach(function (val) {
                        TIPDatabase.getDB().get("select count(*) as result from besuche_plan where client_id = ?", [val.ClientId], function (error, row) {
                            if (row.result > 0) {
                                updateCount++;
                                updateStmt.run([val.Id, val.ClientIdTourPlan, val.IdTourPlan, val.IdGeschaeftspartner, val.Von, val.Bis, val.Status, val.ClientId]);
                            }
                            else {
                                insertCount++;
                                insertStmt.run([val.ClientId, val.Id, val.ClientIdTourPlan, val.IdTourPlan, val.IdGeschaeftspartner, val.Von, val.Bis, val.Status]);
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
                TIPDatabase.getDB().each("select gp.firmenbez_1, bp.von, bp.bis, bp.id, bp.client_id from besuche_plan bp left join geschaeftspartner_st gp on bp.id_geschaeftspartner = gp.id;", function (error, row) {
                    result.push({
                        text: row.firmenbez_1,
                        startDate: row.von,
                        endDate: row.bis,
                        ClientId: row.client_id,
                        Id: row.id
                    });
                }, function () {
                    res.json(result);
                });
            });
        };
        TIPDataVertreterBesuchPlanClass.prototype.deleteBesuchPlanAppointment = function (id, res) {
            TIPDatabase.getDB().run("delete from besuche_plan where id =" + id + ";");
            res.send("OK");
        };
        return TIPDataVertreterBesuchPlanClass;
    })();
    TIP.TIPDataVertreterBesuchPlanClass = TIPDataVertreterBesuchPlanClass;
})(TIP || (TIP = {}));
module.exports = new TIP.TIPDataVertreterBesuchPlanClass();
