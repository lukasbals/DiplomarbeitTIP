var express = require("express");
var sqlite3 = require("sqlite3");
var TIPDatabase = require("../my_modules/TIPDatabase");
var db = new sqlite3.Database("db.sql");
var router = express.Router();
router.get("/initDB", function (req, res) {
    console.log("IN");
    console.log(TIPDatabase.initDB(10));
});
module.exports = router;
