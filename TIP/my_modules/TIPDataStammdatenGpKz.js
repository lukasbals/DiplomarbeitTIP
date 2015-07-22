var request = require("request");
var TIPDatabase = require("../my_modules/TIPDatabase");
var db = TIPDatabase.initDB();
var loadGpKz = function () {
    console.log("In TIPDataStammdatenGpKz -- loadGpKz");
    db.run("create table if not exists gpkz_st (" +
        "code string(2) primary key, " +
        "bezeichnung string(30))");
    request.get("http://10.20.50.53/tip/api/DM360/Stammdaten/GpKz", function (error, response, body) {
        var data = JSON.parse(body);
        db.serialize(function () {
            var insertStmt = db.prepare("insert into gpkz_st (code, bezeichnung) values (?, ?)");
            var updateStmt = db.prepare("update gpkz_st set bezeichnung = ? where code = ?");
            var insertCount = 0;
            var updateCount = 0;
            data.forEach(function (val) {
                db.get("select count(*) as result from gpkz_st where code = ?", [val.Code], function (error, row) {
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
};
module.exports.loadGpKz = loadGpKz;
