var express = require("express");
var TIPDataStammdatenGpKz = require("../my_modules/TIPDataStammdatenGpKz");
var TIPDataStammdatenGeschaeftspartner = require("../my_modules/TIPDataStammdatenGeschaeftspartner");
var TIPDataStammdatenLand = require("../my_modules/TIPDataStammdatenLand");
var TIPDataStammdatenAnrede = require("../my_modules/TIPDataStammdatenAnrede");
var TIPDataStammdatenPersonengruppe = require("../my_modules/TIPDataStammdatenPersonengruppe");
var TIPDataStammdatenPerson = require("../my_modules/TIPDataStammdatenPerson");
var router = express.Router();
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
TIPDataStammdatenGpKz.initTableGpKz();
TIPDataStammdatenGpKz.loadGpKz();
TIPDataStammdatenGeschaeftspartner.initTableGeschaeftspartner();
TIPDataStammdatenGeschaeftspartner.loadGeschaeftspartner();
TIPDataStammdatenLand.initTableLand();
TIPDataStammdatenLand.loadLand();
TIPDataStammdatenAnrede.initTableAnrede();
TIPDataStammdatenAnrede.loadAnrede();
TIPDataStammdatenPersonengruppe.initTablePersonengruppe();
TIPDataStammdatenPersonengruppe.loadPersonengruppe();
TIPDataStammdatenPerson.initTablePerson();
TIPDataStammdatenPerson.loadPerson();
module.exports = router;
