import express = require("express");

var TIPDatabase = require("../my_modules/TIPDatabase")
var TIPDataStammdatenGpKz = require("../my_modules/TIPDataStammdatenGpKz");
var TIPDataStammdatenGeschaeftspartner = require("../my_modules/TIPDataStammdatenGeschaeftspartner");
var TIPDataStammdatenLand = require("../my_modules/TIPDataStammdatenLand");
var TIPDataStammdatenAnrede = require("../my_modules/TIPDataStammdatenAnrede");
var TIPDataStammdatenPersonengruppe = require("../my_modules/TIPDataStammdatenPersonengruppe");
var TIPDataStammdatenPerson = require("../my_modules/TIPDataStammdatenPerson");

var router = express.Router();

//
// get Details
//
router.post('/getDetail', function(req, res) {
  var id: number = req.body.id;
  var table: string = req.body.table;
  TIPDatabase.getDetail(id, table, res);
});

//
// Geschäftspartner
//
router.get("/getJsonGeschaeftspartner", (req, res): void => {
  TIPDataStammdatenGeschaeftspartner.getJsonGeschaeftspartner(res);
});

TIPDataStammdatenGeschaeftspartner.initTableGeschaeftspartner();
TIPDataStammdatenGeschaeftspartner.loadGeschaeftspartner();
//setInterval(() => TIPDataStammdatenGeschaeftspartner.loadGeschaeftspartner(), 30000);

//
// Personen
//
router.get("/getJsonPerson", (req, res): void => {
  TIPDataStammdatenPerson.getJsonPerson(res);
});

TIPDataStammdatenPerson.initTablePerson();
TIPDataStammdatenPerson.loadPerson();
//setInterval(() => TIPDataStammdatenPerson.loadPerson(), 5000);

//
// GpKz
//
router.get("/getJsonGpKz", (req, res): void => {
  // console.log("IN");
  TIPDataStammdatenGpKz.getJsonGpKz(res);
});

TIPDataStammdatenGpKz.initTableGpKz();
TIPDataStammdatenGpKz.loadGpKz();
//setInterval(() => TIPDataStammdatenGpKz.loadGpKz(), 30000);

//
// Länder
//
router.get("/getJsonLand", (req, res): void => {
  TIPDataStammdatenLand.getJsonLand(res);
});

TIPDataStammdatenLand.initTableLand();
TIPDataStammdatenLand.loadLand();
//setInterval(() => TIPDataStammdatenLand.loadLand(), 30000);

//
// Anreden
//
router.get("/getJsonAnrede", (req, res): void => {
  TIPDataStammdatenAnrede.getJsonAnrede(res);
});

TIPDataStammdatenAnrede.initTableAnrede();
TIPDataStammdatenAnrede.loadAnrede();
//setInterval(() => TIPDataStammdatenAnrede.loadAnrede(), 30000);

//
// Personengruppen
//
router.get("/getJsonPersonengruppe", (req, res): void => {
  TIPDataStammdatenPersonengruppe.getJsonPersonengruppe(res);
});

TIPDataStammdatenPersonengruppe.initTablePersonengruppe();
TIPDataStammdatenPersonengruppe.loadPersonengruppe();
//setInterval(() => TIPDataStammdatenPersonengruppe.loadPersonengruppe(), 30000);

module.exports = router;
