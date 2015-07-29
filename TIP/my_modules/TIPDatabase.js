var sqlite3 = require("sqlite3");
var db = new sqlite3.Database("db.sql");
var getDB = function () {
    return db;
};
var setSYNCH = function (tblName, date) {
    db.serialize(function () {
        db.run("create table if not exists synch_st (tabelle string(50), ltzt_synch_start TIMESTAMP)");
        var d = date.toLocaleString();
        db.get("select count(*) as result from synch_st where tabelle = ?;", [tblName], function (error, row) {
            if (row.result > 0) {
                db.run("update synch_st set ltzt_synch_start = ? where tabelle = ?", [d, tblName]);
            }
            else {
                db.run("insert into synch_st (tabelle, ltzt_synch_start) values (?, ?)", [tblName, d]);
            }
        });
    });
};
module.exports.getDB = getDB;
module.exports.setSYNCH = setSYNCH;
