// ******************************************
// Schema for twitter updates.
// __________________________________________

var mongoose = require('mongoose');

var feedItem = mongoose.Schema({

    itemId      : String,
    date        : Date,
    author      : String,
    content     : String,
    source      : String,
    source_url  : String,
    title       : String,
    type        : String

});

// Export model the the app.
module.exports = mongoose.model('FeedItem', feedItem);
