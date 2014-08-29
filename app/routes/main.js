// ******************************************
// Main route handler for JSPRO.
// __________________________________________

module.exports = function(app, passport) {

	// HOME
	app.get('/', function(req, res) {

			// Render homepage.

	});

	// LOGIN GET
	app.get('/login', function(req, res) {

			// Login screen.

	});

	// LOGIN POST
	app.post('/login', passport.authenticate('local-login', {

			// Route for logging in.

	}));

	// SIGNUP GET
	app.get('/signup', function(req, res) {

			// Signup screen.

	});

	// SIGNUP POST
	app.post('/signup', passport.authenticate('local-signup', {

			// Route to sign up.

	}));


	// Sign into facebook.
	app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
				successRedirect : '/',
				failureRedirect : '/'
		}));

	// Sign into google.
	app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

	app.get('/auth/google/callback',
			passport.authenticate('google', {
					successRedirect : '/',
					failureRedirect : '/'
			}));

	// Log out.
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

};
