import sqlite3 = require("sqlite3");
//set connection to node.js Database
var db = new sqlite3.Database("db.sql");

var getDB = (): sqlite3.Database => {
  return db;
}

var setSYNCH = (tblName: string, date: Date): void => {
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

//
// get Detail for any table
//
var getDetail = (id: number, table: string, res): void =>{
  db.serialize((): void => {

    //console.log(tblName);
    db.all("select * from '" + table + "' where id = " + id + ";", (err, req): void => {
      //console.log(req);
      if (req != null) {
        res.send(req);
      } else {
        console.log("Es ist ein Fehler aufgetreten.")
      }

    });
  });
}

module.exports.getDB = getDB;
module.exports.setSYNCH = setSYNCH;
module.exports.getDetail = getDetail;
