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

    return {
        createNew: _createNew,
        schema: _schemaModel,
        model: _model
    }
}();

module.exports = VoteItem;
