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
                "client_id INTEGER PRIMARY KEY, " +
                "id int, " +
                "client_id_besuch int, " +
                "id_besuch int, " +
                "titel string(50), " +
                "is_deleted int, " +
                "is_changed int, " +
                "text TEXT)");
        };
        TIPDataVertreterBerichtClass.prototype.loadTable = function () {
            var _this = this;
            console.log("In TIPDataVertreterBericht -- loadVertreterBericht");
            var date = new Date();
            request.get("http://10.20.50.53/tip/" + "api/DM360/Vertreter/Bericht", function (error, response, body) {
                var data = JSON.parse(body);
                TIPDatabase.getDB().serialize(function () {
                    var insertStmt = TIPDatabase.getDB().prepare("insert into berichte (id, client_id_besuch, id_besuch, titel, is_deleted, is_changed, text) values (?, ?, ?, ?, ?, ?, ?)");
                    var updateStmt = TIPDatabase.getDB().prepare("update berichte set client_id_besuch = ?, id_besuch = ?, titel = ?, is_deleted = ?, is_changed = ?, text = ? where id = ?");
                    var insertCount = 0;
                    var updateCount = 0;
                    data.forEach(function (val) {
                        TIPDatabase.getDB().get("select count(*) as result from berichte where id = ?", [val.Id], function (error, row) {
                            if (row.result > 0) {
                                updateCount++;
                                updateStmt.run([val.ClientIdBesuch, val.IdBesuch, val.Titel, val.IsDeleted, val.IsChanged, val.Text, val.Id]);
                            }
                            else {
                                insertCount++;
                                insertStmt.run([val.Id, val.ClientIdBesuch, val.IdBesuch, val.Titel, val.IsDeleted, val.IsChanged, val.Text]);
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
        TIPDataVertreterBerichtClass.prototype.getBerichtById = function (id, isOnServer, res) {
            var result = new Array();
            console.log(id);
            TIPDatabase.getDB().serialize(function () {
                console.log(isOnServer);
                TIPDatabase.getDB().each("select client_id, id, client_id_besuch, id_besuch, titel, text, is_deleted, is_changed from berichte where ? = ?;", [isOnServer, id], function (err, row) {
                    result.push({
                        ClientId: row.client_id,
                        Id: row.id,
                        ClientIdBesuch: row.client_id_besuch,
                        IdBesuch: row.id_besuch,
                        Titel: row.titel,
                        Text: row.text,
                        IsDeleted: row.is_deleted,
                        IsChanged: row.is_changed
                    });
                }, function () {
                    console.log(result);
                    res.json(result);
                });
            });
        };
        return TIPDataVertreterBerichtClass;
    })();
    TIP.TIPDataVertreterBerichtClass = TIPDataVertreterBerichtClass;
})(TIP || (TIP = {}));
module.exports = new TIP.TIPDataVertreterBerichtClass();
