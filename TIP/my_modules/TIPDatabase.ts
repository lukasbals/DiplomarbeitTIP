import express = require("express");
import sqlite3 = require("sqlite3");
//var request = require("request");

var db = new sqlite3.Database("db.sql");
var router = express.Router();

var initDB = function(value) {
  return value * 2;

  /*db.serialize((): void => {
    db.run("create table if not exists anreden (code text, bezeichnung text)");
  });*/
}

module.exports = initDB;
