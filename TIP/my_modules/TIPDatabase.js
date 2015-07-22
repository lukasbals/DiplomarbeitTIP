var express = require("express");
var sqlite3 = require("sqlite3");
var db = new sqlite3.Database("db.sql");
var router = express.Router();
var initDB = function () {
    console.log("In TIPDatabase -- initDB");
    db.serialize(function () {
        db.run("create table if not exists gpkz_st (" +
            "code string(2) primary key, " +
            "bezeichnung string(30))");
        db.run("create table if not exists geschaeftspartner_st ( " +
            "id integer primary key asc, " +
            "gp_nummer integer, " +
            "code_gpkz text, " +
            "firmenbez1 text, " +
            "firmenbez2 text, " +
            "firmenbez3 text, " +
            "strasse text, " +
            "code_land text, " +
            "plz text, " +
            "ort text, " +
            "telefon text, " +
            "fax text, " +
            "email text, " +
            "homepage text)");
        db.run("create table if not exists laender_st (" +
            "code string(3) primary key, " +
            "bezeichnung string(30), " +
            "is_eu boolean)");
        db.run("create table if not exists anreden_st (" +
            "code string(10) primary key, " +
            "bezeichnung string(80))");
    });
};
module.exports.initDB = initDB;
