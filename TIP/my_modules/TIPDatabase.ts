import sqlite3 = require("sqlite3");

var initDB = function() {
  //set connection to node.js Database
  var db = new sqlite3.Database("db.sql");
  return db;
}

module.exports.initDB = initDB;
