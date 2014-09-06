// ******************************************
// Passport configuration for logging in.
// __________________________________________

// Get Passport going with some strategies.
var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;

// Set user model.
var User       		   = require('../app/models/user');
var bcrypt           = require('bcrypt-nodejs');

// Get the authorization variables.
var configAuth       = require('./auth');

// Expose function to app using module.exports.
module.exports = function(passport) {

    // Serialize user for session.
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // Deserialize user for session.
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(user) {
            done(null, user);
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

            User.findByEmail(email, function(user) {

                if (user) {
                    return done(null, false);
                } else {
                    var newUser            = {};
                    newUser.local          = {};
                    newUser.local.email    = email;
                    newUser.local.password = generateHash(password);

                    User.createNew(newUser, function(doc) {
                        return done(null, doc);
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

        User.findByEmail(email, function(user) {

            if (!user)
                return done(null, false);

            if (!validPassword(password))
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

          User.findFacebookUserById(profile.id, function(user) {

              if (user) {
                  return done(null, user);
              } else {
                  // If there is no user, create one
                  var newUser               = {};
                  newUser.facebook          = {};
                  newUser.facebook.id       = profile.id;
                  newUser.facebook.token    = token;
                  newUser.facebook.name     = profile.name.givenName + ' ' + profile.name.familyName;
                  newUser.facebook.email    = profile.emails[0].value;

                  User.createNew(newUser, function(doc) {
                      return done(null, doc);
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

  	        User.findGoogleUserById( profile.id, function(user) {

  	            if (user) {
  	                return done(null, user);
  	            } else {

  	                var newUser          = {};
                    newUser.google       = {};
  	                newUser.google.id    = profile.id;
  	                newUser.google.token = token;
  	                newUser.google.name  = profile.displayName;
  	                newUser.google.email = profile.emails[0].value; // pull the first email

                    User.createNew(newUser, function(doc) {
                        return done(null, doc);
                    });

  	            }
  	        });
	    });
    }));

    // Generate a hash for PW.
    function generateHash(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };

    // Confirm that a hash is valid.
     function validPassword(password) {
        return bcrypt.compareSync(password, this.local.password);
    };


};
