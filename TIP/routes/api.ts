import express = require("express");
import sqlite3 = require("sqlite3");
var TIPDatabase = require("../my_modules/TIPDatabase");
var TIPDataStammdatenGpKz = require("../my_modules/TIPDataStammdatenGpKz");
var TIPDataStammdatenGeschaeftspartner = require("../my_modules/TIPDataStammdatenGeschaeftspartner");

var db = new sqlite3.Database("db.sql");
var router = express.Router();


router.get("/initDB", (req, res): void => {
  /*TIPDatabase.initDB();
  res.send("done");*/
});

TIPDatabase.initDB();
//setInterval(() => TIPDatabase.initDB(), 30000);

TIPDataStammdatenGpKz.loadGpKz();
//setInterval(() => TIPDataStammdatenGpKz.loadGpKz(), 30000);

TIPDataStammdatenGeschaeftspartner.loadGeschaeftspartner();
//setInterval(() => TIPDataStammdatenGeschaeftspartner.loadGeschaeftspartner(), 30000);

module.exports = router;
