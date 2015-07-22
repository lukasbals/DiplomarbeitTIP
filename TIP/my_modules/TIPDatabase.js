var sqlite3 = require("sqlite3");
var db = new sqlite3.Database("db.sql");
var getDB = function () {
    return db;
};
module.exports.getDB = getDB;
