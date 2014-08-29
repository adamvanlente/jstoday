// ******************************************
// Routes specifically for the cron job.
// This runs and adds tweets and blog posts
// to the database.
// __________________________________________

module.exports = function(app) {

  // Import twitter and blog cron job helpers.
  var twitter = require('../cron/twitter');
  var blogs   = require('../cron/blog');

  // Set up a route for our cron job; it will run with a curl command.
  app.get('/cron', function(req, res) {

      // Support a cron job like function that adds new info to the db.

  });

};
