var sqlite3 = require("sqlite3");
var db = new sqlite3.Database("db.sql");
var TIPDataStammdatenGpKz = require("../my_modules/TIPDataStammdatenGpKz");
var TIPDataStammdatenGeschaeftspartner = require("../my_modules/TIPDataStammdatenGeschaeftspartner");
var TIPDataStammdatenLand = require("../my_modules/TIPDataStammdatenLand");
var TIPDataStammdatenAnrede = require("../my_modules/TIPDataStammdatenAnrede");
var TIPDataStammdatenPersonengruppe = require("../my_modules/TIPDataStammdatenPersonengruppe");
var TIPDataStammdatenPerson = require("../my_modules/TIPDataStammdatenPerson");
var TIP;
(function (TIP) {
    var TIPDatabase = (function () {
        function TIPDatabase() {
            this.tipDataArray = [
                TIPDataStammdatenAnrede,
                TIPDataStammdatenGeschaeftspartner,
                TIPDataStammdatenGpKz,
                TIPDataStammdatenLand,
                TIPDataStammdatenPerson,
                TIPDataStammdatenPersonengruppe
            ];
        }
        TIPDatabase.prototype.getDB = function () {
            console.log("HELLO");
            return db;
        };
        TIPDatabase.prototype.setSYNCH = function (tblName, date) {
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
        TIPDatabase.prototype.doSync = function () {
            this.tipDataArray.forEach(function (e) {
                e.doSync();
            });
        };
        TIPDatabase.prototype.isSyncActive = function () {
            var count = 0;
            this.tipDataArray.forEach(function (e) {
                if (e.isSyncActive() == true) {
                    count++;
                }
                else {
                    count--;
                }
            });
            if (count == 0) {
                return false;
            }
            else {
                return true;
            }
        };
        return TIPDatabase;
    })();
    TIP.TIPDatabase = TIPDatabase;
})(TIP || (TIP = {}));
module.exports = new TIP.TIPDatabase();
