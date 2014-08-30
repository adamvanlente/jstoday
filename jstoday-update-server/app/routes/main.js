// ******************************************
// Route specifically for the auto-adding
// of tweets and blog posts.
// __________________________________________

module.exports = function(app) {

    // Import twitter and blog cron job helpers.
    var twitter = require('../cron/twitter');
    var blogs = require('../cron/blog');

    // Set up a route for our cron job; it will run with a curl command.
    app.get('/cron', function(req, res) {
        twitter.loadNewestTweets();
        blogs.loadNewestBlogEntries();

        var responseObject = {};
        responseObject.success = true;
        responseObject.message = 'Added new tweet and blog entries.';

        res.json(responseObject);
    });

};
