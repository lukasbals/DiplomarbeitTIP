import express = require("express");
import sqlite3 = require("sqlite3");
var request = require("request");

//set connection to node.js Database
var db = new sqlite3.Database("db.sql");
var router = express.Router();

// loads the TABLE gpkz_st from the TIP Server
var loadGpKz = function() {
  console.log("In TIPDataStammdatenGpKz -- loadGpKz");
  request.get(
    "http://10.20.50.53/tip/api/DM360/Stammdaten/GpKz",
    (error, response, body: string): void => {
      var data: any[] = JSON.parse(body);

      db.serialize((): void => {
        var insertStmt = db.prepare("insert into gpkz_st (code, bezeichnung) values (?, ?)");
        var updateStmt = db.prepare("update gpkz_st set bezeichnung = ? where code = ?");

        var insertCount = 0;
        var updateCount = 0;


        data.forEach((val: any): void => {
          db.get("select count(*) as result from gpkz_st where code = ?", [val.Code], (error, row): void => {
            if (row.result > 0) {
              updateCount++;
              updateStmt.run([val.Bezeichnung, val.Code]);
            } else {
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
}

module.exports.loadGpKz = loadGpKz;
