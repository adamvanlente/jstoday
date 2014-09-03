// ******************************************
// Schema for Feed Items.
// __________________________________________

var mongoose = require('mongoose');

// Create the model for feed items and expose it to our app
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

    var _findByTitle = function(title, callback) {
        _model.findOne({ title: title }, function(err, doc) {
            if(err) {
                fail(err);
            } else {
                callback(doc);
            }
        });
    };

    var _findById = function(id, callback) {
        _model.findOne({ itemId: id }, function(err, doc) {
            if(err) {
                fail(err);
            } else {
                callback(doc);
            }
        });
    };

    var _getCount = function(feedObj, callback) {
        _model.count(feedObj, function(err, doc) {
            if(err) {
                console.log(err);
            } else {
                callback(doc);
            }
        });
    };

    var _findMany = function(params, exclusions, sortParams, callback) {

        // Get all the feed items.
        _model.find(params, exclusions, sortParams, function(err, doc) {
            if (err) {
                console.log(err);
            } else {
                callback(doc);
            }
        });
    };

    return {
        createNew: _createNew,
        findByTitle: _findByTitle,
        findById: _findById,
        getCount: _getCount,
        findMany: _findMany,
        schema: _schemaModel,
        model: _model
    }
}();

module.exports = FeedItem;
