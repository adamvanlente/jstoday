var mongoose      = require('mongoose');
var FeedItem      = require('../app/models/feed_item');
var StarredItem   = require('../app/models/starred_item');
var VoteItem      = require('../app/models/vote');
var User          = require('../app/models/user');

// Connecting to a local test database or creating it on the fly
mongoose.connect('mongodb://localhost:27017/jstoday_db_test');

// Mocha test for a feed item.
describe('FeedItem', function(){

    // Delete feed item model after each test.
    afterEach(function(done){
        FeedItem.model.remove({}, function() {
            done();
        });
    });

    // =====================
    // TEST creating a feed item.
    // _____________________
    it('creates a new feed item', function(done) {

        var feedItemObject     = {};

        feedItemObject.author  = 'Adam';
        feedItemObject.content = 'some fake content.';

        FeedItem.createNew(feedItemObject, function(doc) {
            doc.author.should.eql('Adam');
            done();
        });
    });

});

// Mocha test for a starred item.
describe('StarredItem', function(){

    // Delete starred item model after each test.
    afterEach(function(done){
        StarredItem.model.remove({}, function() {
            done();
        });
    });

    // =====================
    // TEST starring an item.
    // _____________________
    it('correctly stars an item', function(done) {

        var starredItemObject      = {};

        starredItemObject.userId   = '0123';
        starredItemObject.itemType = 'SomeType';

        StarredItem.createNew(starredItemObject, function(doc) {
            doc.userId.should.eql('0123');
            doc.itemType.should.eql('SomeType');
            done();
        });
    });

});

// Mocha test for a voted item.
describe('VoteItem', function(){

    // Delete model after each run.
    afterEach(function(done){
        VoteItem.model.remove({}, function() {
            done();
        });
    });

    // =====================
    // TEST voting on an item.
    // _____________________
    it('correctly votes on an item', function(done) {

        var voteItemObject      = {};

        voteItemObject.userId   = '0123';

        VoteItem.createNew(voteItemObject, function(doc) {
            doc.userId.should.eql('0123');
            done();
        });
    });

});

// Mocha test for a User.
describe('User', function(){

    // Delete the User model after each run.
    afterEach(function(done){
        User.model.remove({}, function() {
            done();
        });
    });

    // =====================
    // TEST creating a user.
    // _____________________
    it('correctly adds a new user', function(done) {

        var userObject          = {};

        userObject.local        = {};
        userObject.local.email  = 'adamvanlente@gmail.com';

        User.createNew(userObject, function(doc) {
            doc.local.email.should.eql('adamvanlente@gmail.com');
            done();
        });
    });

    // =====================
    // TEST finding user by email address.
    // _____________________
    it('correctly finds user by email address.', function(done) {

        var userObject          = {};

        userObject.local        = {};
        userObject.local.email  = 'adamvanlente@gmail.com';

        User.createNew(userObject, function(doc) {});

        User.findByEmail('adamvanlente@gmail.com', function(doc) {
            doc.local.email.should.eql('adamvanlente@gmail.com');
            done();
        });
    });

});
