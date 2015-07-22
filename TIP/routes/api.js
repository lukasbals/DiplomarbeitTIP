var express = require("express");
var sqlite3 = require("sqlite3");
var request = require("request");
var TIPDatabase = require("../my_modules/TIPDatabase");
var db = new sqlite3.Database("db.sql");
var router = express.Router();
router.get("/initDB", function (req, res) {
    console.log("IN");
    TIPDatabase.initDB();
});
module.exports = router;
