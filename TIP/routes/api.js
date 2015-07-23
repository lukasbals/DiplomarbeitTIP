var express = require("express");
var TIPDataStammdatenGpKz = require("../my_modules/TIPDataStammdatenGpKz");
var TIPDataStammdatenGeschaeftspartner = require("../my_modules/TIPDataStammdatenGeschaeftspartner");
var TIPDataStammdatenLand = require("../my_modules/TIPDataStammdatenLand");
var TIPDataStammdatenAnrede = require("../my_modules/TIPDataStammdatenAnrede");
var TIPDataStammdatenPersonengruppe = require("../my_modules/TIPDataStammdatenPersonengruppe");
var TIPDataStammdatenPerson = require("../my_modules/TIPDataStammdatenPerson");
var router = express.Router();
router.get("/getJson", function (req, res) {
    TIPDataStammdatenGpKz(res);
});
TIPDataStammdatenGpKz.loadGpKz();
TIPDataStammdatenGeschaeftspartner.loadGeschaeftspartner();
TIPDataStammdatenLand.loadLand();
TIPDataStammdatenAnrede.loadAnrede();
TIPDataStammdatenPersonengruppe.loadPersonengruppe();
TIPDataStammdatenPerson.loadPerson();
module.exports = router;
