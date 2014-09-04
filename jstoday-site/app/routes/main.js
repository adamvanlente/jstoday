// ******************************************
// Main route handler for JSPRO.
// __________________________________________

module.exports = function(app, passport) {

	// HOME
	app.get('/', function(req, res) {
			res.render('index.jade', { user : req.user });
	});

	// LOGIN GET
	app.get('/login', function(req, res) {
			res.render('login.jade', { mode: 'login' });
	});

	// LOGIN POST
	app.post('/login', passport.authenticate('local-login', {
			successRedirect : '/',
			failureRedirect : '/login'
	}));

	// SIGNUP GET
	app.get('/signup', function(req, res) {
			res.render('login.jade', { mode: 'signup' });
	});

	// SIGNUP POST
	app.post('/signup', passport.authenticate('local-signup', {
			successRedirect : '/',
			failureRedirect : '/signup',
	}));

	// ROUTE FOR FACEBOOK SIGN IN
	app.get('/auth/facebook', passport.authenticate('facebook', {
			scope : 'email'
	}));

	app.get('/auth/facebook/callback', passport.authenticate('facebook', {
			successRedirect : '/',
			failureRedirect : '/'
		}));

	// GOOGLE ROUTE
	app.get('/auth/google', passport.authenticate('google', {
			scope : ['profile', 'email']
	}));

	app.get('/auth/google/callback',
			passport.authenticate('google', {
					successRedirect : '/',
					failureRedirect : '/'
			}));

	// LOGOUT ROUTE
	app.get('/logout', function(req, res) {
			req.logout();
			res.redirect('/');
	});

};

// Confirm that a user is logged in.
function isLoggedIn(req, res, next) {

	// Move along if all is well.
	if (req.isAuthenticated())
		return next();

	// Kick back to home page if no user is detected.
	res.redirect('/');
}
