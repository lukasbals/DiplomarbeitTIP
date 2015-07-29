import express = require("express");

var TIPDatabase = require("../my_modules/TIPDatabase");
var TIPDataStammdatenGpKz = require("../my_modules/TIPDataStammdatenGpKz");
var TIPDataStammdatenGeschaeftspartner = require("../my_modules/TIPDataStammdatenGeschaeftspartner");
var TIPDataStammdatenLand = require("../my_modules/TIPDataStammdatenLand");
var TIPDataStammdatenAnrede = require("../my_modules/TIPDataStammdatenAnrede");
var TIPDataStammdatenPersonengruppe = require("../my_modules/TIPDataStammdatenPersonengruppe");
var TIPDataStammdatenPerson = require("../my_modules/TIPDataStammdatenPerson");

var router = express.Router();

router.post('/getGeschaeftspartnerDetail', function(req, res) {
  var id: number = req.body.id;
  var table: string = req.body.table;
  TIPDataStammdatenGeschaeftspartner.getDetails(id, table, res);
});

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

/*TIPDataStammdatenGpKz.initTableGpKz();
TIPDataStammdatenGpKz.loadGpKz();
//setInterval(() => TIPDataStammdatenGpKz.loadGpKz(), 30000);

TIPDataStammdatenGeschaeftspartner.initTableGeschaeftspartner();
TIPDataStammdatenGeschaeftspartner.loadGeschaeftspartner();
//setInterval(() => TIPDataStammdatenGeschaeftspartner.loadGeschaeftspartner(), 30000);

TIPDataStammdatenLand.initTableLand();
TIPDataStammdatenLand.loadLand();
//setInterval(() => TIPDataStammdatenLand.loadLand(), 30000);

TIPDataStammdatenAnrede.initTableAnrede();
TIPDataStammdatenAnrede.loadAnrede();
//setInterval(() => TIPDataStammdatenAnrede.loadAnrede(), 30000);

TIPDataStammdatenPersonengruppe.initTablePersonengruppe();
TIPDataStammdatenPersonengruppe.loadPersonengruppe();
//setInterval(() => TIPDataStammdatenPersonengruppe.loadPersonengruppe(), 30000);

TIPDataStammdatenPerson.initTablePerson();
TIPDataStammdatenPerson.loadPerson();
//setInterval(() => TIPDataStammdatenPerson.loadPerson(), 5000);*/

module.exports = router;
