// ******************************************
// Schema for Feed Items.
// __________________________________________

var mongoose = require('mongoose');

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

    var _model = mongoose.model('FeedItem', _schemaModel);

    var _createNew = function(feedItemObject, callback) {
        _model.create(feedItemObject, function(err, doc) {
            if(err) {
                fail(err);
            } else {
                callback(doc);
            }
        });
    };

    return {
        createNew: _createNew,
        schema: _schemaModel,
        model: _model
    }
}();

module.exports = FeedItem;
