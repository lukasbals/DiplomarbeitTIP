import express = require("express");

var TIPDataStammdatenGpKz = require("../my_modules/TIPDataStammdatenGpKz");
var TIPDataStammdatenGeschaeftspartner = require("../my_modules/TIPDataStammdatenGeschaeftspartner");
var TIPDataStammdatenLand = require("../my_modules/TIPDataStammdatenLand");
var TIPDataStammdatenAnrede = require("../my_modules/TIPDataStammdatenAnrede");
var TIPDataStammdatenPersonengruppe = require("../my_modules/TIPDataStammdatenPersonengruppe");
var TIPDataStammdatenPerson = require("../my_modules/TIPDataStammdatenPerson");
var TIPDataVertreterBesuchPlan = require("../my_modules/TIPDataVertreterBesuchPlan");
var TIPDataVertreterBesuch = require("../my_modules/TIPDataVertreterBesuch");
var TIPDataVertreterBericht = require("../my_modules/TIPDataVertreterBericht");
var TIPDataVertreterBesuchstyp = require("../my_modules/TIPDataVertreterBesuchstyp");
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
// Besuch
//
router.get("/getJsonBesuch", (req, res): void => {
  TIPDataVertreterBesuch.getJsonBesuch(res);
});

router.post("/deleteBesuchAppointment", function(req, res) {
  var id: number = req.body.id;
  TIPDataVertreterBesuch.deleteBesuchAppointment(id, res);
});

router.post("/updateBesuchAppointment", function(req, res) {
  var id: number = req.body.id;
  var startDate: Date = req.body.startDate;
  var endDate: Date = req.body.endDate;
  var id_geschaeftspartner: number = req.body.id_geschaeftspartner;
  var id_besuchstyp: number = req.body.id_besuchstyp;
  var berichtHeadingContent: string = req.body.berichtHeadingContent;
  var berichtContentContent: string = req.body.berichtContentContent;
  var isOnServer: string = req.body.isOnServer;
  TIPDataVertreterBesuch.updateBesuchAppointment(id, startDate, endDate, id_geschaeftspartner, id_besuchstyp, berichtHeadingContent, berichtContentContent, isOnServer, res);
});

router.post("/saveBesuchAppointment", function(req, res) {
  var startDate: Date = req.body.startDate;
  var endDate: Date = req.body.endDate;
  var id_geschaeftspartner: number = req.body.id_geschaeftspartner;
  var id_besuchstyp: number = req.body.id_besuchstyp;
  var berichtHeadingContent: string = req.body.berichtHeadingContent;
  var berichtContentContent: string = req.body.berichtContentContent;
  TIPDataVertreterBesuch.saveBesuchAppointment(startDate, endDate, id_geschaeftspartner, id_besuchstyp, berichtHeadingContent, berichtContentContent, res);
});

router.post("/getDetailBesuch", function(req, res) {
  var id: number = req.body.id;
  TIPDataVertreterBesuch.getDetailBesuch(id, res);
});

router.get("/synchBesuch", function(req, res) {
  TIPDataVertreterBesuch.synchBesuch(res);
});

//
// BesuchPlan
//
router.get("/getJsonBesuchPlan", (req, res): void => {
  TIPDataVertreterBesuchPlan.getJsonBesuchPlan(res);
});

router.post("/deleteBesuchPlanAppointment", function(req, res) {
  var id: number = req.body.id;
  TIPDataVertreterBesuchPlan.deleteBesuchPlanAppointment(id, res);
});

router.post("/updateBesuchPlanAppointment", function(req, res) {
  var id: number = req.body.id;
  var startDate: Date = req.body.startDate;
  var endDate: Date = req.body.endDate;
  var id_geschaeftspartner: number = req.body.id_geschaeftspartner;
  TIPDataVertreterBesuchPlan.updateBesuchPlanAppointment(id, startDate, endDate, id_geschaeftspartner, res);
});

router.post("/saveBesuchPlanAppointment", function(req, res) {
  var startDate: Date = req.body.startDate;
  var endDate: Date = req.body.endDate;
  var id_geschaeftspartner: number = req.body.id_geschaeftspartner;
  TIPDataVertreterBesuchPlan.saveBesuchPlanAppointment(startDate, endDate, id_geschaeftspartner, res);
});

router.post("/getDetailBesuchPlan", function(req, res) {
  var id: number = req.body.id;
  TIPDataVertreterBesuchPlan.getDetailBesuchPlan(id, res);
});

//
// Besuchstyp
//
router.get("/getJsonBesuchstyp", (req, res): void => {
  TIPDataVertreterBesuchstyp.getJsonBesuchstyp(res);
});

//
// Bericht
//
router.post("/getBerichtById", function(req, res) {
  var id: number = req.body.besuchId;
  var isOnServer: string = req.body.isOnServer;
  TIPDataVertreterBericht.getBerichtById(id, isOnServer, res);
});

router.post("/updateBericht", function(req, res)  {
  TIPDataVertreterBericht.updateBericht(req.body, res);
});

router.post("/deleteBericht", function(req, res) {
  var ClientId: number = req.body.ClientId;
  TIPDataVertreterBericht.deleteBericht(ClientId, res);
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
