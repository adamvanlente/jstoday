// ******************************************
// JSPRO APP
//
// Keep up with the latest JS news and tweets
// from movers and shakers.  Log in to the
// app to star articles for later viewing.
// __________________________________________

// Add neccessary modules.
var express      = require('express');
var port         = 3000;
var mongoose     = require('mongoose');
var passport     = require('passport');
var path         = require('path');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var configDB     = require('./config/database.js');

// Connect to database.
mongoose.connect(configDB.url);

// Set up the express application.
var app = express();

// Use our modules.
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

// Pass Passport to the app.
require('./config/passport')(passport);

// Set some passport requirements.
app.use(session({ secret: 'gexpressapp' }));
app.use(passport.initialize());
app.use(passport.session());

// Set up a public directory for scripts & such.
app.use(express.static(path.join(__dirname, 'public')));

// Set up routes.
require('./app/routes/feeds.js')(app);
require('./app/routes/updates.js')(app);
require('./app/routes/main.js')(app, passport);


app.use(function(req, res, next) {
    res.render('404.jade');
});

// launch ======================================================================
app.listen(port);
console.log('jstoday app is running on port', port);
