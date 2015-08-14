var express = require("express");
var TIPDataStammdatenGpKz = require("../my_modules/TIPDataStammdatenGpKz");
var TIPDataStammdatenGeschaeftspartner = require("../my_modules/TIPDataStammdatenGeschaeftspartner");
var TIPDataStammdatenLand = require("../my_modules/TIPDataStammdatenLand");
var TIPDataStammdatenAnrede = require("../my_modules/TIPDataStammdatenAnrede");
var TIPDataStammdatenPersonengruppe = require("../my_modules/TIPDataStammdatenPersonengruppe");
var TIPDataStammdatenPerson = require("../my_modules/TIPDataStammdatenPerson");
var TIPDataVertreterBesuchPlan = require("../my_modules/TIPDataVertreterBesuchPlan");
var TIPDataVertreterBesuch = require("../my_modules/TIPDataVertreterBesuch");
var TIPSync = require("../my_modules/TIPSync");
var router = express.Router();
router.get("/getJsonGeschaeftspartner", function (req, res) {
    TIPDataStammdatenGeschaeftspartner.getJsonGeschaeftspartner(res);
});
router.post('/getDetailGeschaeftspartner', function (req, res) {
    var id = req.body.id;
    TIPDataStammdatenGeschaeftspartner.getDetailGeschaeftspartner(id, res);
});
router.post('/getDetailGeschaeftspartnerForPerson', function (req, res) {
    var id = req.body.id;
    TIPDataStammdatenGeschaeftspartner.getDetailGeschaeftspartnerForPerson(id, res);
});
router.get("/getJsonPerson", function (req, res) {
    TIPDataStammdatenPerson.getJsonPerson(res);
});
router.post("/getDetailPerson", function (req, res) {
    var id = req.body.id;
    TIPDataStammdatenPerson.getDetailPerson(id, res);
});
router.post("/getDetailPersonForGP", function (req, res) {
    var id = req.body.id;
    TIPDataStammdatenPerson.getDetailPersonForGP(id, res);
});
router.get("/getJsonGpKz", function (req, res) {
    TIPDataStammdatenGpKz.getJsonGpKz(res);
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
router.get("/getJsonBesuch", function (req, res) {
    TIPDataVertreterBesuch.getJsonBesuch(res);
});
router.post("/deleteBesuchAppointment", function (req, res) {
    var id = req.body.id;
    TIPDataVertreterBesuch.deleteBesuchAppointment(id, res);
});
router.post("/updateBesuchAppointment", function (req, res) {
    var id = req.body.id;
    var startDate = req.body.startDate;
    var endDate = req.body.endDate;
    var id_geschaeftspartner = req.body.id_geschaeftspartner;
    TIPDataVertreterBesuch.updateBesuchAppointment(id, startDate, endDate, id_geschaeftspartner, res);
});
router.post("/saveBesuchAppointment", function (req, res) {
    var startDate = req.body.startDate;
    var endDate = req.body.endDate;
    var id_geschaeftspartner = req.body.id_geschaeftspartner;
    TIPDataVertreterBesuch.saveBesuchAppointment(startDate, endDate, id_geschaeftspartner, res);
});
router.post("/getDetailBesuch", function (req, res) {
    var id = req.body.id;
    TIPDataVertreterBesuch.getDetailBesuch(id, res);
});
router.get("/getJsonBesuchPlan", function (req, res) {
    TIPDataVertreterBesuchPlan.getJsonBesuchPlan(res);
});
router.post("/deleteBesuchPlanAppointment", function (req, res) {
    var id = req.body.id;
    TIPDataVertreterBesuchPlan.deleteBesuchPlanAppointment(id, res);
});
router.post("/updateBesuchPlanAppointment", function (req, res) {
    var id = req.body.id;
    var startDate = req.body.startDate;
    var endDate = req.body.endDate;
    var id_geschaeftspartner = req.body.id_geschaeftspartner;
    TIPDataVertreterBesuchPlan.updateBesuchPlanAppointment(id, startDate, endDate, id_geschaeftspartner, res);
});
router.post("/saveBesuchPlanAppointment", function (req, res) {
    var startDate = req.body.startDate;
    var endDate = req.body.endDate;
    var id_geschaeftspartner = req.body.id_geschaeftspartner;
    TIPDataVertreterBesuchPlan.saveBesuchPlanAppointment(startDate, endDate, id_geschaeftspartner, res);
});
router.post("/getDetailBesuchPlan", function (req, res) {
    var id = req.body.id;
    TIPDataVertreterBesuchPlan.getDetailBesuchPlan(id, res);
});
router.get("/synchDB", function (req, res) {
    TIPSync.doSync();
    res.send("done.");
});
router.get("/isSyncActive", function (req, res) {
    res.send(TIPSync.isSyncActive());
});
module.exports = router;
