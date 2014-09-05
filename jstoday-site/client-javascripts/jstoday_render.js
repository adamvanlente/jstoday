var jspro = jspro || {};

jspro.render = {

    feedDiv: $('#feed'),

    menu: function() {
        var className = $('#menu').attr('class');

        if (className.search('hidden') == -1) {
            $('#menu').attr('class', 'menu menu--hidden');
        } else {
            $('#menu').attr('class', 'menu menu--revealed');
        }
    },

    feed: function(items) {
        for (var i = 0; i < items.results.length; i++) {
            var item = items.results[i];
            this.insertFeedItem(item);
        }

        var articleLimit = items.count
        if (jspro.globals.feedIndex < articleLimit && items.count > 20) {
            this.insertLoadMoreArticlesButton();
        }
    },

    insertFeedItem: function(item) {

        var isTwitter = item.type == 'twitter';

        var feedItemElement = $('<div></div>')
            .attr('class', 'feed--item');

        this.insertFeedItemTitle(item, isTwitter, feedItemElement);

        this.insertFeedItemContent(item, isTwitter, feedItemElement);

        this.insertFeedItemSourceHolder(item, isTwitter, feedItemElement);

        this.insertFeedItemStar(item, feedItemElement);

        this.feedDiv.append(feedItemElement);
    },

    insertFeedItemTitle: function(item, isTwitter, feedItemElement) {
        var title = isTwitter ? item.content : item.title;
        if (isTwitter) {
            title = jspro.twitterHelper.cleanTweet(title);
        }
        var titleSpan = $('<span></span>')
            .attr('class', 'title')
            .html(title);
        feedItemElement.append(titleSpan);
    },

    insertFeedItemSourceHolder: function(item, isTwitter, feedItemElement) {
        var iconClass = isTwitter ? 'fa fa-twitter' : 'fa fa-align-left';
        var icon = '<i class="' + iconClass + '"></i>';
        var sourceType = isTwitter ? 'tweet' : 'blog entry';
        var source = isTwitter ? item.author : item.source;
        var link = isTwitter ?
            'http://www.twitter.com/statuses/' + item.itemId : item.source_url;
        var sourceHolder = $('<div></div>')
            .attr('class', 'sourceHolder');
        var linkToSource = $('<a></a>')
            .attr('href', link)
            .attr('target', 'new')
            .attr('class', 'sourceSpan ' + item.type)
            .html(icon + sourceType + ' from ' + '<b>' + source + '</b>');
        sourceHolder.append(linkToSource);
        feedItemElement.append(sourceHolder);
    },

    insertFeedItemContent: function(item, isTwitter, feedItemElement) {
        if (!isTwitter) {
            var contentSpan = $('<span></span>')
                .attr('class', 'content')
                .html(item.content);
            feedItemElement.append(contentSpan);
            var readFullArticleButton = $('<a></a>')
                .attr('class', 'fullArticle')
                .attr('href', item.source_url)
                .attr('target', 'new')
                .html('read the full post');
            feedItemElement.append(readFullArticleButton);
        }
    },

    insertFeedItemStar: function(item, feedItemElement) {
        if (jspro.globals.userId) {

            var isStarred = jspro.globals.starredList.indexOf(item._id) != -1;
            var starClass = isStarred ?
                'fa fa-star star-starred' : 'fa fa-star-o star-unstarred';
            starClass += ' feed--item__star';

            var onclickUrl = '/star/' + item._id + '/' +
                jspro.globals.userId + '/' + item.type;
            var onclick = 'jspro.toggleStar(\'' + onclickUrl + '\')';
            var starId = 'star_' + item._id;

            var star = $('<em></em>')
                .attr('id', starId)
                .attr('onclick', onclick)
                .attr('class', starClass);
            feedItemElement.append(star);
        }
    },

    insertLoadMoreArticlesButton: function() {
        var button = $('<button></button>')
            .attr('class', 'feed--readMoreButton')
            .attr('onclick', 'jspro.render.fetchMoreFeedItems()')
            .html('load more items');
        this.feedDiv.append(button);
    },

    resetFeedMode: function(mode) {
        jspro.globals.userId = $('#userId').html();
        jspro.globals.feedIndex = 0;

        this.feedDiv.html('');
        this.getFeedItems(mode);
        $('#menu').attr('class', 'menu menu--hidden');
    },

    resetModeIcons: function(mode) {

        var collection = $('.mode-icon');
        for (var i = 0; i < collection.length; i++) {
            var item = $('#' + collection[i].id);
            var className = item.attr('class');
            var newClassName = className.replace(' selected', ' unselected');
            item.attr('class', newClassName);
        }

        var updatedClass = 'mode-icon ' + mode + ' selected';
        $('#filter_' + mode).attr('class', updatedClass);
    },

    setFeedMode: function(mode) {
        mode = mode || 'all';
        if (mode == jspro.globals.modes.ALL) {
            jspro.globals.currentMode = jspro.globals.modes.ALL;
            jspro.globals.baseFeedUrl = '/feed/all/';
        } else if (mode == jspro.globals.modes.TWITTER) {
            jspro.globals.currentMode = jspro.globals.modes.TWITTER;
            jspro.globals.baseFeedUrl = '/feed/tweets/';
        } else if (mode == jspro.globals.modes.BLOGS) {
            jspro.globals.currentMode = jspro.globals.modes.BLOGS;
            jspro.globals.baseFeedUrl = '/feed/blogs/';
        } else if (mode == jspro.globals.modes.STARRED) {
            jspro.globals.currentMode = jspro.globals.modes.STARRED;
            jspro.globals.baseFeedUrl =
                '/feed/starred/' + jspro.globals.userId + '/';
        }
        return mode;
    },

    getFeedItems: function(mode) {
      $('.loader').show();
      var mode = this.setFeedMode(mode);
      this.resetModeIcons(mode);

      var url = jspro.globals.baseFeedUrl + jspro.globals.feedIndex;

      $.ajax({
         url: url,
         type: 'GET',
         success: function(data){

             jspro.render.feed(data);
             jspro.globals.feedIndex += jspro.globals.feedIndexIncrement;

             $('.loader').hide();
         },
         error: function(err) {
             jspro.uiMessage(err, 'messageBar--error');
         }
      });

    },

    toggleStarredItem: function(res) {

      var id = res.itemId;
      var starred = res.starred
      var star = $('#star_' + id);

      if (starred) {
          var starredClass =
              'fa fa-star feed--item__star star-starred tada animated';
          star.attr('class', starredClass);
          jspro.globals.starredList.push(id);
      } else {
          star.attr('class', 'fa fa-star-o feed--item__star star-unstarred');
          var index = jspro.globals.starredList.indexOf(id);
          jspro.globals.starredList.splice(index, 1);
      }

      if (jspro.globals.starredList.length == 0) {
          $('.starred-items-button').hide();
      } else {
          $('.starred-items-button').show();
      }

    },

    fetchMoreFeedItems: function() {
        $('.feed--readMoreButton').hide();
        jspro.render.getFeedItems();
    }

};
