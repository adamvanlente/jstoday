// ******************************************
// Schema for Starred items.
// __________________________________________

var mongoose = require('mongoose');

var StarredItem = function() {

    var _schemaModel = mongoose.Schema({

        itemId      : String,
        userId      : String,
        itemType    : String,
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

    return {
        createNew: _createNew,
        schema: _schemaModel,
        model: _model
    }
}();

module.exports = StarredItem;
