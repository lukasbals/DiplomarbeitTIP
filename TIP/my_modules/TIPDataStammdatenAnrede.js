var request = require("request");
var TIPDatabase = require("../my_modules/TIPDatabase");
var TIP;
(function (TIP) {
    var TIPDataStammdatenAnredeClass = (function () {
        function TIPDataStammdatenAnredeClass() {
            this.isActive = false;
        }
        TIPDataStammdatenAnredeClass.prototype.doSync = function () {
            this.isActive = true;
            this.initTable();
            this.loadTable();
        };
        TIPDataStammdatenAnredeClass.prototype.initTable = function () {
            TIPDatabase.getDB().run("create table if not exists anreden_st (" +
                "code string(10) primary key, " +
                "bezeichnung string(80))");
        };
        TIPDataStammdatenAnredeClass.prototype.loadTable = function () {
            var _this = this;
            console.log("In TIPDataStammdatenAnrede -- loadAnrede");
            var date = new Date();
            request.get("http://10.20.50.53/tip/" + "api/DM360/Stammdaten/Anrede", function (error, response, body) {
                var data = JSON.parse(body);
                TIPDatabase.getDB().serialize(function () {
                    var insertStmt = TIPDatabase.getDB().prepare("insert into anreden_st (code, bezeichnung) values (?, ?)");
                    var updateStmt = TIPDatabase.getDB().prepare("update anreden_st set bezeichnung = ? where code = ?");
                    var insertCount = 0;
                    var updateCount = 0;
                    data.forEach(function (val) {
                        TIPDatabase.getDB().get("select count(*) as result from anreden_st where code = ?", [val.Code], function (error, row) {
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
            var tblName = "anreden_st";
            TIPDatabase.setSYNCH(tblName, date);
        };
        TIPDataStammdatenAnredeClass.prototype.isSyncActive = function () {
            return this.isActive;
        };
        TIPDataStammdatenAnredeClass.prototype.getJsonAnrede = function (res) {
            var result = new Array();
            TIPDatabase.getDB().serialize(function () {
                TIPDatabase.getDB().each("select code, bezeichnung from anreden_st;", function (error, row) {
                    result.push({
                        Code: row.code,
                        Bezeichnung: row.bezeichnung,
                    });
                }, function () {
                    res.json(result);
                });
            });
        };
        return TIPDataStammdatenAnredeClass;
    }());
    TIP.TIPDataStammdatenAnredeClass = TIPDataStammdatenAnredeClass;
})(TIP || (TIP = {}));
module.exports = new TIP.TIPDataStammdatenAnredeClass();
