// ******************************************
// Schema for recording Votes.
// __________________________________________

var mongoose = require('mongoose');

var voteRecord = mongoose.Schema({

    itemId      : String,
    userId      : String,
    date        : {
        type : Date,
        default: Date.now
    }

});

// Create the model for users and expose it to our app
module.exports = mongoose.model('VoteItem', voteRecord);
