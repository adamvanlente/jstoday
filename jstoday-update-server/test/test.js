var mongoose = require('mongoose');
var FeedItem = require('../app/models/feed_item');

// Connecting to a local test database or creating it on the fly
mongoose.connect('mongodb://localhost:27017/user_test');

// Start Mocha
describe('FeedItem', function(){

    // Delete the User model after each run.
    afterEach(function(done){
        FeedItem.model.remove({}, function() {
            done();
        });
    });

    // =====================
    // TEST creating a feed item.
    // _____________________
    it('creates a new user', function(done) {

        var feedItemObject     = {};

        feedItemObject.author  = 'Adam';
        feedItemObject.content = 'some fake content.';

        FeedItem.createNew(feedItemObject, function(doc) {
            doc.author.should.eql('Adam');
            done();
        });
    });

});
