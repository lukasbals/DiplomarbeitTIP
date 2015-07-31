import express = require('express');
import path = require('path');
import favicon = require('serve-favicon');
import logger = require('morgan');
import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');

var routes = require('./routes/index');
var api = require('./routes/api');
var detail = require('./routes/detail');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
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

// catch 404 and forward to error handler
app.use((req: any, res: any, next: any): void => {
  var err: any = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err: any, req: any, res: any, next: any): void => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err: any, req: any, res: any, next: any): void => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
