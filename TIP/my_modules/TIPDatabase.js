var express = require("express");
var sqlite3 = require("sqlite3");
var request = require("request");
var db = new sqlite3.Database("db.sql");
var router = express.Router();
var TIPDatabase = (function () {
    function TIPDatabase() {
        this.initDB = function () {
            db.serialize(function () {
                db.run("create table if not exists anreden (code text, bezeichnung text)");
            });
        };
    }
    return TIPDatabase;
})();
exports.TIPDatabase = TIPDatabase;
