// ******************************************
// Schema for Starred items.
// __________________________________________

var mongoose = require('mongoose');

var starredItem = mongoose.Schema({

    itemId      : String,
    userId      : String,
    itemType    : String,
    date        : {
        type : Date,
        default: Date.now
    }

});

// Create the model for users and expose it to our app
module.exports = mongoose.model('StarredItem', starredItem);
