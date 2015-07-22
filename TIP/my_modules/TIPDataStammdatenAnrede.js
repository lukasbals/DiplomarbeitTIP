var request = require("request");
var TIPDatabase = require("../my_modules/TIPDatabase");
var loadAnrede = function () {
    console.log("In TIPDataStammdatenAnrede -- Anrede");
    TIPDatabase.getDB().run("create table if not exists anreden_st (" +
        "code string(10) primary key, " +
        "bezeichnung string(80))");
};
module.exports.loadAnrede = loadAnrede;
