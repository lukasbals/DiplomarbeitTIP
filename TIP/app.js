var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var api = require('./routes/api');
var detail = require('./routes/detail');
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/devextreme", express.static(path.join(__dirname, 'devextreme')));
app.use("/angular", express.static(path.join(__dirname, 'node_modules/angular')));
app.use("/angular-sanitize", express.static(path.join(__dirname, 'node_modules/angular-sanitize')));
app.use("/angular-loading-bar", express.static(path.join(__dirname, 'node_modules/angular-loading-bar/build')));
app.use("/jquery", express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/', routes);
app.use('/api', api);
app.use('/detail', detail);
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
module.exports = app;
