var express = require('express');
var router = express.Router();
router.get("/detailGeschaeftspartner", function (req, res, next) {
    res.render("detailGeschaeftspartner");
});
router.get("/detailPerson", function (req, res, next) {
    res.render("detailPerson");
});
router.get("/detailBesuchPlan", function (req, res, next) {
    res.render("detailBesuchPlan");
});
router.get("/detailBesuch", function (req, res, next) {
    res.render("detailBesuch");
});
module.exports = router;
