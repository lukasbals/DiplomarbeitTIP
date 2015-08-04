var request = require("request");
var TIPDatabase = require("../my_modules/TIPDatabase");
var TIP;
(function (TIP) {
    var TIPDataStammdatenPersonengruppe = (function () {
        function TIPDataStammdatenPersonengruppe() {
        }
        TIPDataStammdatenPersonengruppe.prototype.doSync = function () {
            this.initTablePersonengruppe();
            this.loadPersonengruppe();
        };
        TIPDataStammdatenPersonengruppe.prototype.isSyncActive = function () {
            return null;
        };
        TIPDataStammdatenPersonengruppe.prototype.initTablePersonengruppe = function () {
            TIPDatabase.getDB().run("create table if not exists personengruppen_st (" +
                "code string(2) primary key, " +
                "bezeichnung string(50))");
        };
        TIPDataStammdatenPersonengruppe.prototype.loadPersonengruppe = function () {
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
                });
            });
            var tblName = "personengruppen_st";
            TIPDatabase.setSYNCH(tblName, date);
        };
        TIPDataStammdatenPersonengruppe.prototype.getJsonPersonengruppe = function (res) {
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
        return TIPDataStammdatenPersonengruppe;
    })();
    TIP.TIPDataStammdatenPersonengruppe = TIPDataStammdatenPersonengruppe;
})(TIP || (TIP = {}));
module.exports = new TIP.TIPDataStammdatenPersonengruppe();
