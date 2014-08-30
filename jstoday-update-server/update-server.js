// ******************************************
// JSPRO UPDATE SERVER APP
//
// Dumps articles of interest into a database
// to support the main jspro-site app.  This app
// can be run as a cron job.
// __________________________________________

// Add neccessary modules.
var express      = require('express');
var port         = 3000;
var mongoose     = require('mongoose');
var passport     = require('passport');

var configDB     = require('./config/database.js');

// Connect to database.
mongoose.connect(configDB.url);

// Set up the express application.
var app = express();

app.set('view engine', 'jade');

// Pass app to route.
require('./app/routes/main.js')(app);

// launch ======================================================================
app.listen(port);
