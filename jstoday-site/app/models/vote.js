// ******************************************
// Schema for recording Votes.
// __________________________________________

var mongoose = require('mongoose');

var VoteItem = function() {

    var _schemaModel = mongoose.Schema({

        itemId      : String,
        userId      : String,
        date        : {
            type : Date,
            default: Date.now
        }
    });

    var _model = mongoose.model('VoteItem', _schemaModel);

    var _createNew = function(voteItemObject, callback) {
        _model.create(voteItemObject, function(err, doc) {
            if(err) {
                fail(err);
            } else {
                callback(doc);
            }
        });
    };

    var _findOne = function(id, user, callback) {
        _model.findOne({ itemId: id, userId: user }, function(err, item) {
            if (err) {
                fail(err);
            } else {
                callback(item);
            }
        });
    }

    var _findMany = function(params, exclusions, sortParams, callback) {
        _model.find(params, exclusions, sortParams, function(err, doc) {
            if (err) {
                fail(err);
            } else {
                callback(doc);
            }
        });
    };

    return {
        createNew: _createNew,
        schema: _schemaModel,
        findOne: _findOne,
        findMany: _findMany,
        model: _model
    }
}();

module.exports = VoteItem;
