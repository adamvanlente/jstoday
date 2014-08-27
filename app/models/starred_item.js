// ******************************************
// Schema for starred items.
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

// Export model the the app.
module.exports = mongoose.model('StarredItem', starredItem);
