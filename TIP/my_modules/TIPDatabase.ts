import express = require("express");
import sqlite3 = require("sqlite3");

//set connection to node.js Database
var db = new sqlite3.Database("db.sql");
var router = express.Router();

var initDB = function() {
  console.log("In TIPDatabase -- initDB");
  db.serialize((): void => {

    // init gpkz_st TABLE
    db.run("create table if not exists gpkz_st (" +
      "code string(2) primary key, " +
      "bezeichnung string(30))");

    // init geschaeftspartner_st TABLE
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

    // init laender_st TABLE
    db.run("create table if not exists laender_st (" +
      "code string(3) primary key, " +
      "bezeichnung string(30), " +
      "is_eu boolean)");

    // init anreden_st TABLE
    db.run("create table if not exists anreden_st (" +
      "code string(10) primary key, " +
      "bezeichnung string(80))");

  });
}

module.exports.initDB = initDB;
