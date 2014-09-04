// ******************************************
// Passport configuration for logging in.
// __________________________________________

// Get Passport going with some strategies.
var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Set user model.
var User       		= require('../app/models/user');

// Get the authorization variables.
var configAuth = require('./auth');

// Expose function to app using module.exports.
module.exports = function(passport) {

    // Serialize user for session.
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // Deserialize user for session.
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

 	  // LOCAL SIGNUP
    passport.use('local-signup', new LocalStrategy({
        usernameField : 'jspro-email',
        passwordField : 'jspro-password',
        passReqToCallback : true
    },
    function(req, email, password, done) {

        process.nextTick(function() {

            User.findOne({ 'local.email' :  email }, function(err, user) {

                if (err)
                    return done(err);

                if (user) {
                    return done(null, false);
                } else {

                    var newUser            = new User();
                    newUser.local.email    = email;
                    newUser.local.password = newUser.generateHash(password);

                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });
    }));

    // LOCAL LOGIN
    passport.use('local-login', new LocalStrategy({
        usernameField : 'jspro-email',
        passwordField : 'jspro-password',
        passReqToCallback : true
    },
    function(req, email, password, done) {

        User.findOne({ 'local.email' : email }, function(err, user) {

            if (err)
                return done(err)

            if (!user)
                return done(null, false);

            if (!user.validPassword(password))
                return done(null, false);

            return done(null, user);
        });
    }));


    // FACEBOOK
    passport.use(new FacebookStrategy({
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL
    },

    function(token, refreshToken, profile, done) {

        process.nextTick(function() {

          User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

              if (err)
                  return done(err)

              if (user) {
                  return done(null, user);
              } else {
                  // If there is no user, create one
                  var newUser               = new User();
                  newUser.facebook.id       = profile.id;
                  newUser.facebook.token    = token;
                  newUser.facebook.name     = profile.name.givenName + ' ' + profile.name.familyName;
                  newUser.facebook.email    = profile.emails[0].value;


                  // Save the user to the database
                  newUser.save(function(err) {
                      if (err)
                          throw err;

                      // if success, return new user
                      return done(null, newUser);
                  });
              }

          });
        });

    }));

    // GOOGLE
    passport.use(new GoogleStrategy({
        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,
    },
    function(token, refreshToken, profile, done) {

		    process.nextTick(function() {

  	        User.findOne({ 'google.id' : profile.id }, function(err, user) {
  	            if (err)
  	                return done(err);

  	            if (user) {

  	                return done(null, user);
  	            } else {

  	                var newUser          = new User();
  	                newUser.google.id    = profile.id;
  	                newUser.google.token = token;
  	                newUser.google.name  = profile.displayName;
  	                newUser.google.email = profile.emails[0].value; // pull the first email

  	                newUser.save(function(err) {
  	                    if (err)
  	                        throw err;
  	                    return done(null, newUser);
  	                });
  	            }
  	        });
	    });
    }));
};
