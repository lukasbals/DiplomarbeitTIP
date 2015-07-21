var express = require("express");
var sqlite3 = require("sqlite3");
var db = new sqlite3.Database("db.sql");
var router = express.Router();
router.get("/anrede", function (req, res) {
});
module.exports = router;
