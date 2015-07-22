import express = require("express");

var TIPDataStammdatenGpKz = require("../my_modules/TIPDataStammdatenGpKz");
var TIPDataStammdatenGeschaeftspartner = require("../my_modules/TIPDataStammdatenGeschaeftspartner");
var TIPDataStammdatenLand = require("../my_modules/TIPDataStammdatenLand");
var TIPDataStammdatenAnrede = require("../my_modules/TIPDataStammdatenAnrede");

var router = express.Router();


router.get("/initDB", (req, res): void => {
  /*TIPDatabase.initDB();
  res.send("done");*/
});

TIPDataStammdatenGpKz.loadGpKz();
//setInterval(() => TIPDataStammdatenGpKz.loadGpKz(), 30000);

TIPDataStammdatenGeschaeftspartner.loadGeschaeftspartner();
//setInterval(() => TIPDataStammdatenGeschaeftspartner.loadGeschaeftspartner(), 30000);

TIPDataStammdatenLand.loadLand();
//setInterval(() => TIPDataStammdatenLand.loadLand(), 30000);

TIPDataStammdatenAnrede.loadAnrede();
//setInterval(() => TIPDataStammdatenAnrede.loadAnrede(), 5000);

module.exports = router;
