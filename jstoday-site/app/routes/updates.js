// ******************************************
// Handles Starring and Voting for articles.
// __________________________________________

var StarredItem   = require('../models/starred_item');
var FeedItem      = require('../models/feed_item');

module.exports = function(app) {

    // STAR AN ITEM.
    app.post('/star/:item/:user/:type', function(req, res){

        var item = req.params.item || 0;
        var user = req.params.user || 0;
        var type = req.params.type || 0;

        StarredItem.findOne(item, user, function(starredItem) {

            if (starredItem) {

                starredItem.remove(function(err, removedItem) {
                    if (err) {
                        console.log('could no remove', err);
                    } else {

                        var responseObj = {};
                        responseObj.success = true;
                        responseObj.starred = false;
                        responseObj.itemId  = item;
                        responseObj.message = 'Successfully unstarred item';

                        res.json(responseObj);
                    }
                });

            } else {

                var newStar            = {};

                newStar.itemId         = item;
                newStar.userId         = user;
                newStar.itemType       = type;
                newStar.starType       = 'star';

                StarredItem.createNew(newStar, function(doc) {
                    var responseObj = {};

                    responseObj.success = true;
                    responseObj.starred = true;
                    responseObj.itemId  = item;
                    responseObj.message = 'Successfully starred item';

                    res.json(responseObj);
                });
            }
        })

    });
};
