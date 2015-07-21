import express = require("express");
import request = require("request");
import sqlite3 = require("sqlite3");

var db = new sqlite3.Database("db.sql");
var router = express.Router();

router.get("/anrede", (req, res): void => {

});

module.exports = router;
