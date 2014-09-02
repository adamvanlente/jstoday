// ******************************************
// Schema for Feed Items.
// __________________________________________

var mongoose = require('mongoose');

// Create the model for users and expose it to our app
// module.exports = mongoose.model('FeedItem', feedItem);

var FeedItem = function() {

    var _schemaModel = mongoose.Schema({

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

    // Declare a model
    var _model = mongoose.model('FeedItem', _schemaModel);

    // Creating a register method for convenience
    var _createNew = function(feedItemObject, callback) {
        _model.create(feedItemObject, function(err, doc) {
            if(err) {
                fail(err);
            } else {
                callback(doc);
            }
        });
    };

    // Return new Schema object.
    return {
        createNew: _createNew,
        schema: _schemaModel,
        model: _model
    }
}();

// module.exports = User;
module.exports = FeedItem;
