import sqlite3 = require("sqlite3");
//set connection to node.js Database
var db = new sqlite3.Database("db.sql");

var TIPDataStammdatenGpKz = require("../my_modules/TIPDataStammdatenGpKz");
var TIPDataStammdatenGeschaeftspartner = require("../my_modules/TIPDataStammdatenGeschaeftspartner");
var TIPDataStammdatenLand = require("../my_modules/TIPDataStammdatenLand");
var TIPDataStammdatenAnrede = require("../my_modules/TIPDataStammdatenAnrede");
var TIPDataStammdatenPersonengruppe = require("../my_modules/TIPDataStammdatenPersonengruppe");
var TIPDataStammdatenPerson = require("../my_modules/TIPDataStammdatenPerson");

module TIP {
  export class TIPDatabase {
      getDB(): sqlite3.Database {
      console.log("HELLO");
      return db;
    }

    setSYNCH(tblName: string, date: Date): void {
      db.serialize((): void => {
        db.run("create table if not exists synch_st (tabelle string(50), ltzt_synch_start TIMESTAMP)");

        var d = date.toLocaleString();

        //console.log(tblName);
        db.get("select count(*) as result from synch_st where tabelle = ?;", [tblName], (error, row): void => {
          //console.log(row.result);
          if (row.result > 0) {
            db.run("update synch_st set ltzt_synch_start = ? where tabelle = ?", [d, tblName])
          } else {
            db.run("insert into synch_st (tabelle, ltzt_synch_start) values (?, ?)", [tblName, d]);
          }
        });
      });
    }

    tipDataArray = [
      TIPDataStammdatenAnrede,
      TIPDataStammdatenGeschaeftspartner,
      TIPDataStammdatenGpKz,
      TIPDataStammdatenLand,
      TIPDataStammdatenPerson,
      TIPDataStammdatenPersonengruppe
    ];

    doSync(): void {
      this.tipDataArray.forEach((e): void => {
        e.doSync();
      });
    }

    isSyncActive(): boolean {
      var count: number = 0;
      this.tipDataArray.forEach((e): void => {
        if (e.isSyncActive() == true) {
          count++;
        } else {
          count--;
        }
      });
      if (count == 0) {
        return false;
      } else {
        return true;
      }
    }
  }
}

module.exports = new TIP.TIPDatabase();
