var express = require('express');
var router = express.Router();
router.post('/', function (req, res, next) {
    console.log("IN");
    res.render('geschaeftspartner', { title: 'Geschaeftspartner' });
});
module.exports = router;
