var request = require("request");
var TIPDatabase = require("../my_modules/TIPDatabase");
var TIP;
(function (TIP) {
    var TIPDataVertreterBesuchstypClass = (function () {
        function TIPDataVertreterBesuchstypClass() {
            this.isActive = false;
        }
        TIPDataVertreterBesuchstypClass.prototype.doSync = function () {
            this.isActive = true;
            this.initTable();
            this.loadTable();
        };
        TIPDataVertreterBesuchstypClass.prototype.initTable = function () {
            TIPDatabase.getDB().run("create table if not exists besuchstypen_st (" +
                "id int primary key, " +
                "bezeichnung string(50));");
        };
        TIPDataVertreterBesuchstypClass.prototype.loadTable = function () {
            var _this = this;
            console.log("In TIPDataVertreterBesuchstyp -- loadBesuchstyp");
            var date = new Date();
            request.get("http://10.20.50.53/tip/" + "api/DM360/Vertreter/Besuchstyp", function (error, response, body) {
                var data = JSON.parse(body);
                TIPDatabase.getDB().serialize(function () {
                    var insertStmt = TIPDatabase.getDB().prepare("insert into besuchstypen_st (id, bezeichnung) values (?, ?)");
                    var updateStmt = TIPDatabase.getDB().prepare("update besuchstypen_st set bezeichnung = ? where id = ?");
                    var insertCount = 0;
                    var updateCount = 0;
                    data.forEach(function (val) {
                        TIPDatabase.getDB().get("select count(*) as result from besuchstypen_st where id = ?", [val.Id], function (error, row) {
                            if (row.result > 0) {
                                updateCount++;
                                updateStmt.run([val.Bezeichnung, val.Id]);
                            }
                            else {
                                insertCount++;
                                insertStmt.run([val.Id, val.Bezeichnung]);
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
            var tblName = "besuchstypen_st";
            TIPDatabase.setSYNCH(tblName, date);
        };
        TIPDataVertreterBesuchstypClass.prototype.isSyncActive = function () {
            return this.isActive;
        };
        TIPDataVertreterBesuchstypClass.prototype.getJsonBesuchstyp = function (res) {
            var result = new Array();
            TIPDatabase.getDB().serialize(function () {
                TIPDatabase.getDB().each("select id, bezeichnung from besuchstypen_st;", function (error, row) {
                    result.push({
                        Id: row.id,
                        Bezeichnung: row.bezeichnung
                    });
                }, function () {
                    res.json(result);
                });
            });
        };
        return TIPDataVertreterBesuchstypClass;
    })();
    TIP.TIPDataVertreterBesuchstypClass = TIPDataVertreterBesuchstypClass;
})(TIP || (TIP = {}));
module.exports = new TIP.TIPDataVertreterBesuchstypClass();
