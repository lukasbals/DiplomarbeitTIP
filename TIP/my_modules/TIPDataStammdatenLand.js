var request = require("request");
var TIPDatabase = require("../my_modules/TIPDatabase");
var TIP;
(function (TIP) {
    var TIPDataStammdatenLandClass = (function () {
        function TIPDataStammdatenLandClass() {
            this.isActive = false;
        }
        TIPDataStammdatenLandClass.prototype.doSync = function () {
            this.isActive = true;
            this.initTable();
            this.loadTable();
        };
        TIPDataStammdatenLandClass.prototype.initTable = function () {
            TIPDatabase.getDB().run("create table if not exists laender_st (" +
                "code string(3) primary key, " +
                "bezeichnung string(30), " +
                "is_eu boolean)");
        };
        TIPDataStammdatenLandClass.prototype.loadTable = function () {
            var _this = this;
            console.log("In TIPDataStammdatenLand -- loadLand");
            var date = new Date();
            request.get("http://10.20.50.53/tip/api/DM360/Stammdaten/Land", function (error, response, body) {
                var data = JSON.parse(body);
                TIPDatabase.getDB().serialize(function () {
                    var insertStmt = TIPDatabase.getDB().prepare("insert into laender_st (code, bezeichnung, is_eu) values (?, ?, ?)");
                    var updateStmt = TIPDatabase.getDB().prepare("update laender_st set bezeichnung = ?, is_eu = ? where code = ?");
                    var insertCount = 0;
                    var updateCount = 0;
                    data.forEach(function (val) {
                        TIPDatabase.getDB().get("select count(*) as result from laender_st where code = ?", [val.Code], function (error, row) {
                            if (row.result > 0) {
                                updateCount++;
                                updateStmt.run([val.Bezeichnung, val.IsEU, val.Code]);
                            }
                            else {
                                insertCount++;
                                insertStmt.run([val.Code, val.Bezeichnung, val.IsEU]);
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
            var tblName = "laender_st";
            TIPDatabase.setSYNCH(tblName, date);
        };
        TIPDataStammdatenLandClass.prototype.isSyncActive = function () {
            return this.isActive;
        };
        TIPDataStammdatenLandClass.prototype.getJsonLand = function (res) {
            var result = new Array();
            TIPDatabase.getDB().serialize(function () {
                TIPDatabase.getDB().each("select code, bezeichnung, is_eu from laender_st;", function (error, row) {
                    result.push({
                        Code: row.code,
                        Bezeichnung: row.bezeichnung,
                        IsEU: row.is_eu
                    });
                }, function () {
                    res.json(result);
                });
            });
        };
        return TIPDataStammdatenLandClass;
    })();
    TIP.TIPDataStammdatenLandClass = TIPDataStammdatenLandClass;
})(TIP || (TIP = {}));
module.exports = new TIP.TIPDataStammdatenLandClass();
