import express = require("express");

var TIPDataStammdatenGpKz = require("../my_modules/TIPDataStammdatenGpKz");
var TIPDataStammdatenGeschaeftspartner = require("../my_modules/TIPDataStammdatenGeschaeftspartner");
var TIPDataStammdatenLand = require("../my_modules/TIPDataStammdatenLand");
var TIPDataStammdatenAnrede = require("../my_modules/TIPDataStammdatenAnrede");
var TIPDataStammdatenPersonengruppe = require("../my_modules/TIPDataStammdatenPersonengruppe");
var TIPDataStammdatenPerson = require("../my_modules/TIPDataStammdatenPerson");

var router = express.Router();

router.get("/getJsonGpKz", (req, res): void => {
  // console.log("IN");
  TIPDataStammdatenGpKz.getJsonGpKz(res);
});

router.get("/getJsonGeschaeftspartner", (req, res): void => {
  TIPDataStammdatenGeschaeftspartner.getJsonGeschaeftspartner(res);
});

router.get("/getJsonLand", (req, res): void => {
  TIPDataStammdatenLand.getJsonLand(res);
});

router.get("/getJsonAnrede", (req, res): void => {
  TIPDataStammdatenAnrede.getJsonAnrede(res);
});

router.get("/getJsonPersonengruppe", (req, res): void => {
  TIPDataStammdatenPersonengruppe.getJsonPersonengruppe(res);
});

router.get("/getJsonPerson", (req, res): void => {
  TIPDataStammdatenPerson.getJsonPerson(res);
});


/*TIPDataStammdatenGpKz.loadGpKz();
//setInterval(() => TIPDataStammdatenGpKz.loadGpKz(), 30000);

TIPDataStammdatenGeschaeftspartner.loadGeschaeftspartner();
//setInterval(() => TIPDataStammdatenGeschaeftspartner.loadGeschaeftspartner(), 30000);

TIPDataStammdatenLand.loadLand();
//setInterval(() => TIPDataStammdatenLand.loadLand(), 30000);

TIPDataStammdatenAnrede.loadAnrede();
//setInterval(() => TIPDataStammdatenAnrede.loadAnrede(), 30000);

TIPDataStammdatenPersonengruppe.loadPersonengruppe();
//setInterval(() => TIPDataStammdatenPersonengruppe.loadPersonengruppe(), 30000);

TIPDataStammdatenPerson.loadPerson();
//setInterval(() => TIPDataStammdatenPerson.loadPerson(), 5000);*/

module.exports = router;
