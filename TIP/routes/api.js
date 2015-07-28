var express = require("express");
var TIPDatabase = require("../my_modules/TIPDatabase");
var TIPDataStammdatenGpKz = require("../my_modules/TIPDataStammdatenGpKz");
var TIPDataStammdatenGeschaeftspartner = require("../my_modules/TIPDataStammdatenGeschaeftspartner");
var TIPDataStammdatenLand = require("../my_modules/TIPDataStammdatenLand");
var TIPDataStammdatenAnrede = require("../my_modules/TIPDataStammdatenAnrede");
var TIPDataStammdatenPersonengruppe = require("../my_modules/TIPDataStammdatenPersonengruppe");
var TIPDataStammdatenPerson = require("../my_modules/TIPDataStammdatenPerson");
var router = express.Router();
router.post('/getDetails', function (req, res) {
    var id = req.body.id;
    var table = req.body.table;
    TIPDatabase.getDetails(id, table, res);
});
router.get("/getJsonGpKz", function (req, res) {
    TIPDataStammdatenGpKz.getJsonGpKz(res);
});
router.get("/getJsonGeschaeftspartner", function (req, res) {
    TIPDataStammdatenGeschaeftspartner.getJsonGeschaeftspartner(res);
});
router.get("/getJsonLand", function (req, res) {
    TIPDataStammdatenLand.getJsonLand(res);
});
router.get("/getJsonAnrede", function (req, res) {
    TIPDataStammdatenAnrede.getJsonAnrede(res);
});
router.get("/getJsonPersonengruppe", function (req, res) {
    TIPDataStammdatenPersonengruppe.getJsonPersonengruppe(res);
});
router.get("/getJsonPerson", function (req, res) {
    TIPDataStammdatenPerson.getJsonPerson(res);
});
module.exports = router;
