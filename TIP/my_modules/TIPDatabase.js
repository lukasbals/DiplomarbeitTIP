var express = require("express");
var sqlite3 = require("sqlite3");
var db = new sqlite3.Database("db.sql");
var router = express.Router();
var initDB = function (value) {
    return value * 2;
};
module.exports = initDB;
