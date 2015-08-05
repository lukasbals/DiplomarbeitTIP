var request = require("request");
var TIPDatabase = require("../my_modules/TIPDatabase");
var TIP;
(function (TIP) {
    var TIPDataVertreterBerichtClass = (function () {
        function TIPDataVertreterBerichtClass() {
            this.isActive = false;
        }
        TIPDataVertreterBerichtClass.prototype.doSync = function () {
            this.isActive = true;
            this.initTable();
            this.loadTable();
        };
        TIPDataVertreterBerichtClass.prototype.initTable = function () {
            TIPDatabase.getDB().run("create table if not exists berichte (" +
                "client_id int primary key, " +
                "id int, " +
                "client_id_besuch int, " +
                "id_besuch int, " +
                "titel string(50), " +
                "text TEXT)");
        };
        TIPDataVertreterBerichtClass.prototype.loadTable = function () {
            var _this = this;
            console.log("In TIPDataVertreterBericht -- loadVertreterBericht");
            var date = new Date();
            request.get("http://10.20.50.53/tip/" + "api/DM360/Vertreter/Bericht", function (error, response, body) {
                var data = JSON.parse(body);
                TIPDatabase.getDB().serialize(function () {
                    var insertStmt = TIPDatabase.getDB().prepare("insert into berichte (client_id, id, client_id_besuch, id_besuch, titel, text) values (?, ?, ?, ?, ?, ?)");
                    var updateStmt = TIPDatabase.getDB().prepare("update berichte set id = ?, client_id_besuch = ?, id_besuch = ?, titel = ?, text = ? where client_id = ?");
                    var insertCount = 0;
                    var updateCount = 0;
                    data.forEach(function (val) {
                        TIPDatabase.getDB().get("select count(*) as result from berichte where client_id = ?", [val.Code], function (error, row) {
                            if (row.result > 0) {
                                updateCount++;
                                updateStmt.run([val.Id, val.ClientIdBesuch, val.IdBesuch, val.Titel, val.Text, val.ClientId]);
                            }
                            else {
                                insertCount++;
                                insertStmt.run([val.ClientId, val.Id, val.ClientIdBesuch, val.IdBesuch, val.Titel, val.Text]);
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
            var tblName = "berichte";
            TIPDatabase.setSYNCH(tblName, date);
        };
        TIPDataVertreterBerichtClass.prototype.isSyncActive = function () {
            return this.isActive;
        };
        return TIPDataVertreterBerichtClass;
    })();
    TIP.TIPDataVertreterBerichtClass = TIPDataVertreterBerichtClass;
})(TIP || (TIP = {}));
module.exports = new TIP.TIPDataVertreterBerichtClass();
