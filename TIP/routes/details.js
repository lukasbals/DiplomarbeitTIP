var express = require('express');
var router = express.Router();
router.post('/postDetails', function (req, res, next) {
    res.get('details', { title: 'M.I.E.' });
});
module.exports = router;
