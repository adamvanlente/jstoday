var jspro = jspro || {};

jspro.render = {

    feedDiv: $('#feed'),

    menu: function() {
        console.log('rendering menu');
    },

    feed: function(items) {
        for (var i = 0; i < items.results.length; i++) {
            var item = items.results[i];
            this.insertFeedItem(item);
        }

        var articleLimit = items.count
        if (jspro.globals.feedIndex < articleLimit) {
            this.insertLoadMoreArticlesButton();
        }
    },

    insertFeedItem: function(item) {

        var feedItem = $('<div></div>')
            .attr('class', 'feed--item');

        var title = item.type == 'twitter' ? item.content : item.title;
        var titleSpan = $('<span></span>')
            .attr('class', 'title')
            .html(title);

        var iconClass = item.type == 'twitter' ?
            'fa fa-twitter' : 'fa fa-align-left';
        var icon = '<i class="' + iconClass + '"></i>';

        var isTwitter = item.type == 'twitter';

        var sourceType = isTwitter ? 'tweet' : 'blog entry';
        var source = isTwitter ? item.author : item.source;
        var link = isTwitter ?
            'http://www.twitter.com/statuses/' + item.itemId : item.source_url;
        var linkToSource = $('<a></a>')
            .attr('href', link)
            .attr('target', 'new')
            .attr('class', 'sourceSpan ' + item.type)
            .html(icon + sourceType + ' from ' + source);

        feedItem.append(titleSpan);

        if (!isTwitter) {
            var contentSpan = $('<span></span>')
                .attr('class', 'content')
                .html(item.content);
            feedItem.append(contentSpan);
            var readFullArticleButton = $('<a></a>')
                .attr('class', 'fullArticle')
                .attr('href', item.source_url)
                .attr('target', 'new')
                .html('read the full post');
            feedItem.append(readFullArticleButton);
        }

        feedItem.append(linkToSource);
        this.feedDiv.append(feedItem);
    },

    insertLoadMoreArticlesButton: function() {
        var button = $('<button></button>')
            .attr('class', 'feed--readMoreButton')
            .attr('onclick', 'jspro.render.fetchMoreFeedItems()')
            .html('load more items');
        this.feedDiv.append(button);
    },

    getFeedItems: function() {

      var url = jspro.globals.baseFeedUrl + jspro.globals.feedIndex;
      console.log(url);
      $.ajax({
         url: url,
         type: 'GET',
         success: function(data){
             jspro.render.feed(data);
             jspro.globals.feedIndex += jspro.globals.feedIndexIncrement;
         },
         error: function(err) {
             jspro.uiMessage(err, 'messageBar--error');
         }
      });

    },

    fetchMoreFeedItems: function() {
        $('.feed--readMoreButton').hide();
        jspro.render.getFeedItems();
    }

};
