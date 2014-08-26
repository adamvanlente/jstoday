// ******************************************
// JSPRO APP
//
// Keep up with the latest JS news and tweets
// from movers and shakers.  Log in to the
// app to star articles for later viewing.
// __________________________________________

// Add neccessary modules.
var express      = require('express');
// var port         = 80;
var port         = 3000; // dev port
var mongoose     = require('mongoose');
var passport     = require('passport');
var path         = require('path');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var configDB     = require('./config/database.js');

// Set up the express application.
var app = express();

// launch ======================================================================
app.listen(port);
