// ******************************************
// Pass over RSS feeds and store posts in the DB.
// __________________________________________

// Import Feed Reader and FeedItem schema.
var feedRead   = require('feed-read');
var FeedItem   = require('../models/feed_item');
var config     = require('../../config/feed-lists');


// ******************************************
// Function to export
// __________________________________________

module.exports = {

  loadNewestBlogEntries: function() {

        // List if RSS feeds to check.
        var feedList = config.feedList;

        // Pass over the list of feeds.
        for (var i = 0; i < feedList.length; i++) {

            var feedItem = feedList[i];

            // Read an RSS feed, and store each article.
            feedRead(feedItem, function(err, articles) {
                if (err) {
                    console.log('feedReader failed on an item: ', feedItem);
                } else {
                    for (var j = 0; j < articles.length; j++) {
                        storeArticleContent(articles[j]);
                    }
                }

            });
        }
    },
};

// ******************************************
// Helper functions for storing newest posts.
// __________________________________________

// Store an article in the DB.
function storeArticleContent(article) {

    // Ignore articles without content.
    if (article && !article.content || article.content == '') {
        console.log('This article has no content or does not exist.');
    } else {

        // Check if an item with this ID already exists.
        FeedItem.findOne({ 'title' :  article.title }, function(err, item) {

            if (err)
                return done(err);

            if (item) {
                console.log('This (blog) item already exists.')
            } else {
                // Create a new feed item for the database.
                var newFeedItem         = new FeedItem();

                newFeedItem.itemId      = article.title;
                newFeedItem.title       = article.title;
                newFeedItem.content     = article.content;
                newFeedItem.date        = article.published;
                newFeedItem.source      = article.feed.name;
                newFeedItem.author      = article.author;
                newFeedItem.source_url  = article.link;
                newFeedItem.type        = 'blog';

                newFeedItem.save(function(err) {
                    if (err) {
                        console.log('unable to add article.');
                    } else {
                        console.log('Added an article.');
                    }
                });
            }
        });
    }
}
