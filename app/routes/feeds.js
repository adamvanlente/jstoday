// ******************************************
// Route for all feed responses.
// __________________________________________

// Get the models for the feed items.
var FeedItem      = require('../models/feed_item');
var StarredItem   = require('../models/starred_item');
var VoteItem      = require('../models/vote');

// TODO this script needs MAD comments.

module.exports = function(app) {

  // GET ALL BY DATE
  app.get('/feed/all/:start', function(req, res) {

      // Get all items (tweets and blog posts)
      // Paginated version

  });

  // GET ALL BY DATE
  app.get('/feed/all/popular/:start', function(req, res) {

      // Get all items, order by popularity.

  });

  // TWITTER FEEDS
  app.get('/feed/tweets/:start', function(req, res) {

      // Paginated list of tweets.

  });

  // BLOG ENTRIES
  app.get('/feed/blogs/:start', function(req, res) {

      // Paginated list of blogs

  });

  app.get('/feed/starredItems/:user/:start', function(req, res) {

      // Get list of starred items by user, paginated

  });

  app.get('/feed/starred/:user', function(req, res) {

      // Get a list of ids of starred items for a user.

  });

  app.get('/feed/votes/:user', function(req, res) {

      // Get a list of ids of articles a user has starred.

  });

  function renderResponse(count, doc, success, res, message) {

      // Helper function that renders a response for client side js.

  }

};
