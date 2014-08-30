// ******************************************
// Schema for Feed Items.
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
    type        : String,
    votes       : {
        type : String,
        default: '0'
    }

});

// Create the model for users and expose it to our app
module.exports = mongoose.model('FeedItem', feedItem);
