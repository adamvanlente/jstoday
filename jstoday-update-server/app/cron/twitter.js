// ******************************************
// Pass over list of tweets and add them to the database.
// __________________________________________

// Bring in helpers for Twitter and Database.
var OAuth2             = require('oauth').OAuth2;
var https              = require('https');
var mongoose           = require('mongoose');

// Get the FeedItem Schema and config settings.
var FeedItem           = require('../models/feed_item');
var config             = require('../../config/feed-lists');


// ******************************************
// Function to export
// __________________________________________

module.exports = {

    loadNewestTweets: function() {
        var twitterUsers = config.twitterUsers;

        // Get the OAuth credentials.
        var twitterAuth = getTwitterAuth();

        // Get the Twitter Access token for App-only requests.
        twitterAuth.getOAuthAccessToken('',
            { 'grant_type': 'client_credentials' }, function(e, access_token) {

            // Get tweets for every one of our users.
            for (var i = 0; i < twitterUsers.length; i++) {
                var user = twitterUsers[i];
                var options = getTimelineRequestOptions(user, access_token);
                requestAndHandleTweets(options);
            }

        });
    }
};

// ******************************************
// Helper functions for loading newest tweets.
// __________________________________________

// Get the OAuth credentials in order to fetch an Access Key.
function getTwitterAuth() {

  // Settings for requesting OAuth.
  var twitterCredentials  = config.twitterCredentials;
  var key                 = twitterCredentials.key;
  var secret              = twitterCredentials.secret;
  var reqUrl              = 'https://api.twitter.com/';
  var reqPath             = 'oauth2/token';

  // Return OAuth request.
  return new OAuth2(key, secret, reqUrl, null, reqPath, null);
}

// Get the options needed for the Auth request to twitter.
function getTimelineRequestOptions(user, access_token) {

    var options = {
         hostname: 'api.twitter.com',
         path: '/1.1/statuses/user_timeline.json?screen_name=' + user +
             '&exclude_replies=true',
         headers: {
             Authorization: 'Bearer ' + access_token
         }
     };
     return options;
}

function requestAndHandleTweets(options) {

    // Get request for a Twitter User's timeline.
    https.get(options, function(result){

        // Result comes back in parts - build a buffer.
        var buffer = '';
        result.setEncoding('utf8');
        result.on('data', function(data){
            buffer += data;
        });

        // Get the json returned from Twitter and store some info.
        result.on('end', function(){
            var tweets = JSON.parse(buffer);
            for (var j = 0; j < tweets.length; j++) {
                var tweet = tweets[j];
                addTwitterItemToDatabase(tweet);
            }
        });
    });
}

function addTwitterItemToDatabase(tweet) {

    FeedItem.findById(tweet.id_str, function(item) {

        if (item) {

            // pass.
        } else {

            // Create a new feed item for the database.
            var newFeedItem         = {};
            var userName            = tweet.user.screen_name;
            newFeedItem.itemId      = tweet.id_str;
            newFeedItem.content     = tweet.text;
            newFeedItem.date        = tweet.created_at;
            newFeedItem.source      = 'Twitter';
            newFeedItem.author      = userName;
            newFeedItem.source_url  = 'http://twitter.com/' + userName;
            newFeedItem.type        = 'twitter';
            newFeedItem.votes       = '0';

            FeedItem.createNew(newFeedItem, function(doc) {
                console.log('added item');
            });
        }
    });
}
