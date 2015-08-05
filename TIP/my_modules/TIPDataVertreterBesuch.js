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
                "client_id int primary key, " +
                "id int, " +
                "id_besuchstyp int, " +
                "client_id_besuch_plan int, " +
                "id_besuch_plan int, " +
                "id_geschaeftspartner int, " +
                "von date, " +
                "bis date)");
        };
        TIPDataVertreterBesuchClass.prototype.loadTable = function () {
            var _this = this;
            console.log("In TIPDataVertreterBesuch -- loadVertreterBesuch");
            var date = new Date();
            request.get("http://10.20.50.53/tip/" + "api/DM360/Vertreter/Besuch", function (error, response, body) {
                var data = JSON.parse(body);
                TIPDatabase.getDB().serialize(function () {
                    var insertStmt = TIPDatabase.getDB().prepare("insert into besuche (client_id, id, id_besuchstyp, client_id_besuch_plan, id_besuch_plan, id_geschaeftspartner, von, bis) values (?, ?, ?, ?, ?, ?, ?, ?)");
                    var updateStmt = TIPDatabase.getDB().prepare("update besuche set id = ?, id_besuchstyp = ?, client_id_besuch_plan = ?, id_besuch_plan = ?, id_geschaeftspartner = ?, von = ?, bis = ? where client_id = ?");
                    var insertCount = 0;
                    var updateCount = 0;
                    data.forEach(function (val) {
                        TIPDatabase.getDB().get("select count(*) as result from besuche where client_id = ?", [val.Code], function (error, row) {
                            if (row.result > 0) {
                                updateCount++;
                                updateStmt.run([val.Id, val.IdBesuchstyp, val.ClientIdBesuchPlan, val.IdBesuchPlan, val.IdGeschaeftspartner, val.Von, val.Bis, val.ClientId]);
                            }
                            else {
                                insertCount++;
                                insertStmt.run([val.ClientId, val.Id, val.IdBesuchstyp, val.ClientIdBesuchPlan, val.IdBesuchPlan, val.IdGeschaeftspartner, val.Von, val.Bis]);
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
        TIPDataVertreterBesuchClass.prototype.isSyncActive = function () {
            return this.isActive;
        };
        return TIPDataVertreterBesuchClass;
    })();
    TIP.TIPDataVertreterBesuchClass = TIPDataVertreterBesuchClass;
})(TIP || (TIP = {}));
module.exports = new TIP.TIPDataVertreterBesuchClass();
