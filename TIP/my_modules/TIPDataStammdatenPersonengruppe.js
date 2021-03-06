var request = require("request");
var TIPDatabase = require("../my_modules/TIPDatabase");
var TIP;
(function (TIP) {
    var TIPDataStammdatenPersonengruppeClass = (function () {
        function TIPDataStammdatenPersonengruppeClass() {
            this.isActive = false;
        }
        TIPDataStammdatenPersonengruppeClass.prototype.doSync = function () {
            this.isActive = true;
            this.initTable();
            this.loadTable();
        };
        TIPDataStammdatenPersonengruppeClass.prototype.initTable = function () {
            TIPDatabase.getDB().run("create table if not exists personengruppen_st (" +
                "code string(2) primary key, " +
                "bezeichnung string(50))");
        };
        TIPDataStammdatenPersonengruppeClass.prototype.loadTable = function () {
            var _this = this;
            console.log("In TIPDataStammdatenPersonenGruppe -- loadPersonengruppe");
            var date = new Date();
            request.get("http://10.20.50.53/tip/api/DM360/Stammdaten/Personengruppe", function (error, response, body) {
                var data = JSON.parse(body);
                TIPDatabase.getDB().serialize(function () {
                    var insertStmt = TIPDatabase.getDB().prepare("insert into personengruppen_st (code, bezeichnung) values (?, ?)");
                    var updateStmt = TIPDatabase.getDB().prepare("update personengruppen_st set bezeichnung = ? where code = ?");
                    var insertCount = 0;
                    var updateCount = 0;
                    data.forEach(function (val) {
                        TIPDatabase.getDB().get("select count(*) as result from personengruppen_st where code = ?", [val.Code], function (error, row) {
                            if (row.result > 0) {
                                updateCount++;
                                updateStmt.run([val.Bezeichnung, val.Code]);
                            }
                            else {
                                insertCount++;
                                insertStmt.run([val.Code, val.Bezeichnung]);
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
            var tblName = "personengruppen_st";
            TIPDatabase.setSYNCH(tblName, date);
        };
        TIPDataStammdatenPersonengruppeClass.prototype.isSyncActive = function () {
            return this.isActive;
        };
        TIPDataStammdatenPersonengruppeClass.prototype.getJsonPersonengruppe = function (res) {
            var result = new Array();
            TIPDatabase.getDB().serialize(function () {
                TIPDatabase.getDB().each("select code, bezeichnung from personengruppen_st;", function (error, row) {
                    result.push({
                        Code: row.code,
                        Bezeichnung: row.bezeichnung,
                    });
                }, function () {
                    res.json(result);
                });
            });
        };
        return TIPDataStammdatenPersonengruppeClass;
    })();
    TIP.TIPDataStammdatenPersonengruppeClass = TIPDataStammdatenPersonengruppeClass;
})(TIP || (TIP = {}));
module.exports = new TIP.TIPDataStammdatenPersonengruppeClass();
