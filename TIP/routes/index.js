var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    res.render('index');
});
router.get("/geschaeftspartner", function (req, res, next) {
    res.render("geschaeftspartner");
});
router.get("/person", function (req, res, next) {
    res.render("person");
});
router.get("/besuchPlan", function (req, res, next) {
    res.render("besuchPlan");
});
router.get("/besuch", function (req, res, next) {
    res.render("besuch");
});
module.exports = router;
