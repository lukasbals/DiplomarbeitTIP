var sqlite3 = require("sqlite3");
var express = require('express');
var router = express.Router();
router.get("/", function (req, res, next) {
    res.render("details", { title: "Details" });
});
router.post('/getDetails', function (req, res) {
    var id = req.body.id;
    var table = req.body.table;
    console.log(table, id);
    var db = new sqlite3.Database("db.sql");
    db.serialize(function () {
        db.all("select * from '" + table + "' where id = " + id + ";", function (err, req) {
            if (req != null) {
                res.send(req);
            }
            else {
                console.log("Es ist ein Fehler aufgetreten.");
            }
        });
    });
});
module.exports = router;
