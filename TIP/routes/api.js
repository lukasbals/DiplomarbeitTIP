var express = require("express");
var TIPDataStammdatenGpKz = require("../my_modules/TIPDataStammdatenGpKz");
var TIPDataStammdatenGeschaeftspartner = require("../my_modules/TIPDataStammdatenGeschaeftspartner");
var TIPDataStammdatenLand = require("../my_modules/TIPDataStammdatenLand");
var TIPDataStammdatenAnrede = require("../my_modules/TIPDataStammdatenAnrede");
var router = express.Router();
router.get("/initDB", function (req, res) {
});
TIPDataStammdatenGpKz.loadGpKz();
TIPDataStammdatenGeschaeftspartner.loadGeschaeftspartner();
TIPDataStammdatenLand.loadLand();
TIPDataStammdatenAnrede.loadAnrede();
module.exports = router;
