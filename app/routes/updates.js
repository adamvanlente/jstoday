// ******************************************
// Handles Starring and Voting for articles.
// __________________________________________

var StarredItem   = require('../models/starred_item');
var FeedItem   = require('../models/feed_item');
var VoteItem   = require('../models/vote');

module.exports = function(app) {

    app.post('/vote/:item/:user', function(req, res) {

        // Let a user vote or unvote an item

    });

    // STAR AN ITEM.
    app.post('/star/:item/:user/:type', function(req, res){

        // Let a user star or unstar an item.

    });
};
