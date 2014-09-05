// ******************************************
// Route for all feed responses.
// __________________________________________

// Get the models for the feed items.
var FeedItem      = require('../models/feed_item');
var StarredItem   = require('../models/starred_item');

// TODO this script needs MAD comments.

module.exports = function(app) {

    // ===============
    // GET ALL BY DATE
    // _______________
    app.get('/feed/all/:start', function(req, res) {

        // Start the response at this record.
        var start = req.params.start || 0;

        var count;
        FeedItem.getCount({}, function(itemCount) {
            count = itemCount;
        });

        var exclusions = {__v: 0};
        var sortParams = {sort: {date: -1}, skip: start, limit: 20};
        FeedItem.findMany({}, exclusions, sortParams, function(items) {
            renderResponse(count, items, true, res);
        });

    });


    // ===============
    // GET ALL BY DATE
    // _______________
    app.get('/feed/tweets/:start', function(req, res) {

        // Start the response at this record.
        var start = req.params.start || 0;

        var count;
        FeedItem.getCount({ type: 'twitter' }, function(itemCount) {
            count = itemCount;
        });

        var exclusions = {__v: 0};
        var sortParams = {sort: {date: -1}, skip: start, limit: 20};
        FeedItem.findMany({type : 'twitter'}, exclusions, sortParams, function(items) {
            renderResponse(count, items, true, res);
        });

    });

    // ===============
    // GET ALL BY DATE
    // _______________
    app.get('/feed/blogs/:start', function(req, res) {

        // Start the response at this record.
        var start = req.params.start || 0;

        var count;
        FeedItem.getCount({ type: 'blog' }, function(itemCount) {
            count = itemCount;
        });

        var exclusions = {__v: 0};
        var sortParams = {sort: {date: -1}, skip: start, limit: 20};
        FeedItem.findMany({type : 'blog'}, exclusions, sortParams, function(items) {
            renderResponse(count, items, true, res);
        });

    });

    // ===============
    // GET ALL BY DATE
    // _______________
    app.get('/feed/all/popular/:start', function(req, res) {

        // Start the response at this record.
        var start = req.params.start || 0;

        var count;
        FeedItem.getCount({}, function(itemCount) {
            count = itemCount;
        });

        var exclusions = {__v: 0};
        var sortParams = {sort: {votes: -1, date: -1}, skip: start, limit: 20};
        FeedItem.findMany({}, exclusions, sortParams, function(items) {
            renderResponse(count, items, true, res);
        });

    });

    // ===============
    // GET A USER'S FEED ITEMS.
    // _______________
    app.get('/feed/starred/:user/:start', function(req, res) {

        var user   = req.params.user;
        var start  = req.params.start;

        var params = {userId: user};

        var count;
        StarredItem.getCount(params, function(itemCount) {
            count = itemCount;
        });

        var exclusions = {__v: 0};
        var sortParams = {sort: {date: -1}};
        StarredItem.findMany(params, exclusions, sortParams, function(doc) {
            renderResponse(count, doc, true, res);
        });

    });


    // ===============
    // GET JUST THE ITEM IDS OF A USER'S FEED ITEMS.
    // _______________
    app.get('/feed/allstarred/:user', function(req, res) {

        var listForResponse = [];

        var user   = req.params.user;

        var params = {userId: user};
        var exclusions = {__v: 0, itemType: 0, userId: 0, _id: 0, date: 0};
        var sortParams = {sort: {date: -1}};
        StarredItem.findMany(params, exclusions, sortParams, function(doc) {
            for (var i = 0; i < doc.length; i++) {
                listForResponse.push(doc[i].itemId);
            }
            res.json(listForResponse);
        });

    });


    // ===============
    // GET JUST THE ITEM IDS OF A USER'S FEED ITEMS.
    // _______________
    app.get('/feed/allvoted/:user', function(req, res) {

        var listForResponse = [];

        var user   = req.params.user;

        var params = {userId: user};
        var exclusions = {__v: 0, itemType: 0, userId: 0, _id: 0, date: 0};
        var sortParams = {sort: {date: -1}};
        VoteItem.findMany(params, exclusions, sortParams, function(doc) {
            for (var i = 0; i < doc.length; i++) {
                listForResponse.push(doc[i].itemId);
            }
            res.json(listForResponse);
        });

    });

    // ===============
    // HELPER FUNCTION FOR RENDERING A RESPONSE.
    // _______________
    function renderResponse(count, doc, success, res, message) {

        message          = message || 'no message';

        var response     = {};

        response.count   = count;
        response.results = doc;
        response.success = success;
        response.message = message

        res.json(response);

    }



};
