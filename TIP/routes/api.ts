import express = require("express");

var TIPDataStammdatenGpKz = require("../my_modules/TIPDataStammdatenGpKz");
var TIPDataStammdatenGeschaeftspartner = require("../my_modules/TIPDataStammdatenGeschaeftspartner");
var TIPDataStammdatenLand = require("../my_modules/TIPDataStammdatenLand");
var TIPDataStammdatenAnrede = require("../my_modules/TIPDataStammdatenAnrede");
var TIPDataStammdatenPersonengruppe = require("../my_modules/TIPDataStammdatenPersonengruppe");
var TIPDataStammdatenPerson = require("../my_modules/TIPDataStammdatenPerson");
var TIPDataVertreterBesuchPlan = require("../my_modules/TIPDataVertreterBesuchPlan");
var TIPSync = require("../my_modules/TIPSync");

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

router.post('/getDetailGeschaeftspartnerForPerson', function(req, res) {
  var id: number = req.body.id;
  TIPDataStammdatenGeschaeftspartner.getDetailGeschaeftspartnerForPerson(id, res);
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
// BesuchPlan
//
router.get("/getJsonBesuchPlan", (req, res): void => {
  TIPDataVertreterBesuchPlan.getJsonBesuchPlan(res);
});

router.post("/deleteBesuchPlanAppointment", function(req, res) {
  console.log("IN");
  var id: number = req.body.id;
  TIPDataVertreterBesuchPlan.deleteBesuchPlanAppointment(id, res);
});

//
// synch data from TIP server to node database
//
router.get("/synchDB", (req, res): void => {
  TIPSync.doSync();
  res.send("done.");
});

//setInterval(() => console.log(TIPSync.isSyncActive()), 1000);

router.get("/isSyncActive", (req, res): void => {
  res.send(TIPSync.isSyncActive());
  //res.send("done.");
});

module.exports = router;
