var mongoose = require('mongoose');
var FeedItem = require('../app/models/feed_item');

// Connecting to a local test database or creating it on the fly
mongoose.connect('mongodb://localhost:27017/jstoday_db_test');

// Mocha test for a feed item.
describe('FeedItem', function(){

    // Delete feed item model after each test run.
    afterEach(function(done){
        FeedItem.model.remove({}, function() {
            done();
        });
    });

    // =====================
    // TEST creating a feed item.
    // _____________________
    it('creates a new feed item.', function(done) {

        var feedItemObject     = {};

        feedItemObject.author  = 'Adam';
        feedItemObject.content = 'some fake content.';
        feedItemObject.title   = 'Freaky Deaky';

        FeedItem.createNew(feedItemObject, function(doc) {
            doc.author.should.eql('Adam');
            doc.title.should.eql('Freaky Deaky');
            done();
        });
    });

    // =====================
    // TEST finding a feed item.
    // _____________________
    it('find a feed item by title.', function(done) {

        var feedItemObject     = {};

        feedItemObject.author  = 'Adam';
        feedItemObject.content = 'some fake content.';
        feedItemObject.title   = 'Freaky Deaky';

        FeedItem.createNew(feedItemObject, function(doc) {});

        FeedItem.findByTitle('Freaky Deaky', function(item) {
            item.title.should.eql('Freaky Deaky');
            done();
        })

    });

    // =====================
    // TEST creating a feed item.
    // _____________________
    it('find a feed item by id.', function(done) {

        var feedItemObject     = {};

        feedItemObject.author  = 'Adam';
        feedItemObject.content = 'some fake content.';
        feedItemObject.title   = 'Freaky Deaky';
        feedItemObject.itemId  = '019019';

        FeedItem.createNew(feedItemObject, function(doc) {});

        FeedItem.findById('019019', function(item) {
            item.itemId.should.eql('019019');
            done();
        })

    });



});
