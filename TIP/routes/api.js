var express = require("express");
var sqlite3 = require("sqlite3");
var request = require("request");
var db = new sqlite3.Database("db.sql");
var router = express.Router();
module.exports = router;
