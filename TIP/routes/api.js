var express = require("express");
var sqlite3 = require("sqlite3");
var TIPDatabase = require("../my_modules/TIPDatabase");
var TIPDataStammdatenGpKz = require("../my_modules/TIPDataStammdatenGpKz");
var db = new sqlite3.Database("db.sql");
var router = express.Router();
router.get("/initDB", function (req, res) {
});
TIPDatabase.initDB();
TIPDataStammdatenGpKz.loadGpKz();
setInterval(function () { return TIPDataStammdatenGpKz.loadGpKz(); }, 30000);
module.exports = router;
