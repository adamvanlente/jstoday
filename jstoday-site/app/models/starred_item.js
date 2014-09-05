// ******************************************
// Schema for Starred items.
// __________________________________________

var mongoose = require('mongoose');

var StarredItem = function() {

    var _schemaModel = mongoose.Schema({

        itemId      : String,
        userId      : String,
        itemType    : String,
        starType    : String,
        date        : {
            type : Date,
            default: Date.now
        }
    });

    var _model = mongoose.model('StarredItem', _schemaModel);

    var _createNew = function(starredItemObject, callback) {
        _model.create(starredItemObject, function(err, doc) {
            if(err) {
                fail(err);
            } else {
                callback(doc);
            }
        });
    };

    var _findOne = function(id, user, callback) {
        console.log('mongoose', id, user)
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

    var _getCount = function(obj, callback) {
        _model.count(obj, function(err, doc) {
            if(err) {
                console.log(err);
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
        getCount: _getCount,
        model: _model
    }
}();

module.exports = StarredItem;
