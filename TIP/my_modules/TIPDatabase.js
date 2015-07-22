var sqlite3 = require("sqlite3");
var initDB = function () {
    var db = new sqlite3.Database("db.sql");
    return db;
};
module.exports.initDB = initDB;
