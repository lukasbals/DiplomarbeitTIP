import sqlite3 = require("sqlite3");
var db = new sqlite3.Database("db.sql");

var getDB = function() {
  //set connection to node.js Database
  return db;
}

var setSYNCH = (tblName: string, date: Date): void => {
  db.serialize((): void => {
    db.run("create table if not exists synch_st (tabelle string(50), ltzt_synch_start TIMESTAMP)");

    var d: string = "" + date.getFullYear() + "-";
    console.log(d);
    //console.log(tblName);
    db.get("select count(*) as result from synch_st where tabelle = '" + tblName + "';", (error, row): void => {
      //console.log(row.result);
      if (row.result > 0) {
        db.run("update synch_st set ltzt_synch_start = " + d + " where tabelle = '" + tblName + "'")
      } else {
        db.run("insert into synch_st (tabelle, ltzt_synch_start) values ('" + tblName + "', " + d + ")");
      }

    });
  });
}

module.exports.getDB = getDB;
module.exports.setSYNCH = setSYNCH;
