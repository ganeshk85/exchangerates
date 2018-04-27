var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var config = require('./config/database');

//Routes
var index = require('./routes/index');
var users = require('./routes/users');
var exchangerate = require('./routes/exchangerate');
var currencytype = require('./routes/currencytype');
var api = require('./routes/api');

//Set up mongoose connection
mongoose.connect(config.database);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
//On Connection
db.on('connected', () => {
  console.log('MongoDB connected to database '+config.database);
});
//On Error
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//enable cors
app.use(cors());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//enable routes
app.use('/', index);
app.use('/users', users);
app.use('/exchangerate', exchangerate);
app.use('/currencytype', currencytype);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
