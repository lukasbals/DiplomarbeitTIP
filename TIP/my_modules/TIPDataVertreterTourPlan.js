var request = require("request");
var TIPDatabase = require("../my_modules/TIPDatabase");
var TIP;
(function (TIP) {
    var TIPDataVertreterTourPlanClass = (function () {
        function TIPDataVertreterTourPlanClass() {
            this.isActive = false;
        }
        TIPDataVertreterTourPlanClass.prototype.doSync = function () {
            this.isActive = true;
            this.initTable();
            this.loadTable();
        };
        TIPDataVertreterTourPlanClass.prototype.initTable = function () {
            TIPDatabase.getDB().run("create table if not exists touren_plan (" +
                "client_id int primary key, " +
                "id int," +
                "tour_name string(50)," +
                "von date," +
                "bis date);");
        };
        TIPDataVertreterTourPlanClass.prototype.loadTable = function () {
            var _this = this;
            console.log("In TIPDataVertreterBesuchstyp -- loadTourPlan");
            var date = new Date();
            request.get("http://10.20.50.53/tip/" + "api/DM360/Vertreter/TourPlan", function (error, response, body) {
                var data = JSON.parse(body);
                TIPDatabase.getDB().serialize(function () {
                    var insertStmt = TIPDatabase.getDB().prepare("insert into touren_plan (client_id, id, tour_name, von, bis) values (?, ?, ?, ?, ?)");
                    var updateStmt = TIPDatabase.getDB().prepare("update touren_plan set id = ?, tour_name = ?, von = ?, bis = ? where client_id = ?");
                    var insertCount = 0;
                    var updateCount = 0;
                    data.forEach(function (val) {
                        TIPDatabase.getDB().get("select count(*) as result from touren_plan where client_id = ?", [val.ClientId], function (error, row) {
                            if (row.result > 0) {
                                updateCount++;
                                updateStmt.run([val.Id, val.TourName, val.startDate, val.endDate, val.ClientId]);
                            }
                            else {
                                insertCount++;
                                insertStmt.run([val.ClientId, val.Id, val.TourName, val.startDate, val.endDate]);
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
            var tblName = "touren_plan";
            TIPDatabase.setSYNCH(tblName, date);
        };
        TIPDataVertreterTourPlanClass.prototype.isSyncActive = function () {
            return this.isActive;
        };
        return TIPDataVertreterTourPlanClass;
    })();
    TIP.TIPDataVertreterTourPlanClass = TIPDataVertreterTourPlanClass;
})(TIP || (TIP = {}));
module.exports = new TIP.TIPDataVertreterTourPlanClass();
