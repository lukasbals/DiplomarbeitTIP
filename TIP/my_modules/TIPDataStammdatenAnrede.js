var request = require("request");
var TIPDatabase = require("../my_modules/TIPDatabase");
var db = TIPDatabase.initDB();
var loadAnrede = function () {
    console.log("In TIPDataStammdatenAnrede -- Anrede");
    db.run("create table if not exists anreden_st (" +
        "code string(10) primary key, " +
        "bezeichnung string(80))");
};
module.exports.loadAnrede = loadAnrede;
