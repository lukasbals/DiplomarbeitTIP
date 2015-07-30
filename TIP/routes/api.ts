import express = require("express");

var TIPDataStammdatenGpKz = require("../my_modules/TIPDataStammdatenGpKz");
var TIPDataStammdatenGeschaeftspartner = require("../my_modules/TIPDataStammdatenGeschaeftspartner");
var TIPDataStammdatenLand = require("../my_modules/TIPDataStammdatenLand");
var TIPDataStammdatenAnrede = require("../my_modules/TIPDataStammdatenAnrede");
var TIPDataStammdatenPersonengruppe = require("../my_modules/TIPDataStammdatenPersonengruppe");
var TIPDataStammdatenPerson = require("../my_modules/TIPDataStammdatenPerson");

var router = express.Router();
//
// Geschäftspartner
//
router.get("/getJsonGeschaeftspartner", (req, res): void => {
  TIPDataStammdatenGeschaeftspartner.getJsonGeschaeftspartner(res);
});

router.post('/getDetailGeschaeftspartner', function(req, res) {
  var id: number = req.body.id;
  TIPDataStammdatenGeschaeftspartner.getDetailGeschaeftspartner(id, res);
});

//
// Personen
//
router.get("/getJsonPerson", (req, res): void => {
  TIPDataStammdatenPerson.getJsonPerson(res);
});

router.post("/getDetailPerson", function(req, res) {
  var id: number = req.body.id;
  TIPDataStammdatenPerson.getDetailPerson(id, res);
});

router.post("/getDetailPersonForGP", function(req, res) {
  var id: number = req.body.id;
  TIPDataStammdatenPerson.getDetailPersonForGP(id, res);
});

//
// GpKz
//
router.get("/getJsonGpKz", (req, res): void => {
  // console.log("IN");
  TIPDataStammdatenGpKz.getJsonGpKz(res);
});

//
// Länder
//
router.get("/getJsonLand", (req, res): void => {
  TIPDataStammdatenLand.getJsonLand(res);
});

//
// Anreden
//
router.get("/getJsonAnrede", (req, res): void => {
  TIPDataStammdatenAnrede.getJsonAnrede(res);
});

//
// Personengruppen
//
router.get("/getJsonPersonengruppe", (req, res): void => {
  TIPDataStammdatenPersonengruppe.getJsonPersonengruppe(res);
});

//
// synch data from TIP server to node database
//
router.get("/synchDB", (req, res): void => {
  TIPDataStammdatenGpKz.initTableGpKz();
  TIPDataStammdatenGpKz.loadGpKz();
  //setInterval(() => TIPDataStammdatenGpKz.loadGpKz(), 30000);

  TIPDataStammdatenLand.initTableLand();
  TIPDataStammdatenLand.loadLand();
  //setInterval(() => TIPDataStammdatenLand.loadLand(), 30000);

  TIPDataStammdatenAnrede.initTableAnrede();
  TIPDataStammdatenAnrede.loadAnrede();
  //setInterval(() => TIPDataStammdatenAnrede.loadAnrede(), 30000);

  TIPDataStammdatenPersonengruppe.initTablePersonengruppe();
  TIPDataStammdatenPersonengruppe.loadPersonengruppe();
  //setInterval(() => TIPDataStammdatenPersonengruppe.loadPersonengruppe(), 30000);

  TIPDataStammdatenGeschaeftspartner.initTableGeschaeftspartner();
  TIPDataStammdatenGeschaeftspartner.loadGeschaeftspartner();
  //setInterval(() => TIPDataStammdatenGeschaeftspartner.loadGeschaeftspartner(), 30000);

  TIPDataStammdatenPerson.initTablePerson();
  TIPDataStammdatenPerson.loadPerson();
  //setInterval(() => TIPDataStammdatenPerson.loadPerson(), 5000);
  res.send("done.");
});

module.exports = router;
