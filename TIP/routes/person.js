var express = require('express');
var router = express.Router();
router.get("/", function (req, res, next) {
    res.render("person", { title: "Personen" });
});
module.exports = router;
