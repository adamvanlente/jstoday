// ******************************************
// Schema for User accounts
// __________________________________________

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var User = function() {

    var _schemaModel = mongoose.Schema({

        local            : {
            email        : String,
            password     : String,
        },
        facebook         : {
            id           : String,
            token        : String,
            email        : String,
            name         : String
        },
        google           : {
            id           : String,
            token        : String,
            email        : String,
            name         : String
        }

    });


    // Generate a hash for PW.
    _schemaModel.methods.generateHash = function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };

    // Confirm that a hash is valid.
    _schemaModel.methods.validPassword = function(password) {
        return bcrypt.compareSync(password, this.local.password);
    };

    var _model = mongoose.model('User', _schemaModel);

    var _createNew = function(userObject, callback) {
        _model.create(userObject, function(err, doc) {
            if(err) {
                fail(err);
            } else {
                callback(doc);
            }
        });
    };

    var _findByEmail = function(email, callback) {
        _model.findOne({ 'local.email' : email}, function(err, doc) {
            if(err) {
                fail(err);
            } else {
                callback(doc);
            }
        });
    }

    return {
        createNew: _createNew,
        findByEmail: _findByEmail,
        schema: _schemaModel,
        model: _model
    }
}();

module.exports = User;
