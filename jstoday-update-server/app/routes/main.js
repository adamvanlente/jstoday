// ******************************************
// Routes specifically for the cron - auto adding
// of tweets and blog posts.
// __________________________________________

module.exports = function(app) {

  // Import twitter and blog cron job helpers.
  var twitter = require('../cron/twitter');
  var blogs = require('../cron/blog');

  // Set up a route for our cron job; it will run with a curl command.
  app.get('/cron', function(req, res) {

      // Run the cron job functions.

  });

};
