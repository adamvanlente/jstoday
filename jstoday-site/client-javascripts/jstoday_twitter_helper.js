var jspro = jspro || {};

jspro.twitterHelper = {

    cleanTweet: function(tweet) {
      tweet = this.searchTweetForLinks(tweet);

      tweet = tweet.replace(/@/g, '@user--name--here--');

      var personMentions = tweet.split('@');
      var newTweet = [];
      for (var i = 0; i < personMentions.length; i++) {
         var item = personMentions[i];
         if (item.search('user--name--here--') != -1) {
            item = this.findTwitterUserInString(item);
            newTweet.push(item);
         } else {
            newTweet.push(item);
         }
      }
      return newTweet.join(' ');
    },

    findTwitterUserInString: function(string) {
      var stringArray = string.split(' ');
      var newString = [];
      for (var i = 0; i < stringArray.length; i++) {
        var stringItem = stringArray[i];
        if (stringItem.search('user--name--here--') != -1) {
          stringItem = stringItem.replace('user--name--here--', '@');
          var userName = this.sanitizeTwitterUser(stringItem);


          var twitterUserLink = '<a href="http://www.twitter.com/' +
              userName + '" target="_new">' + stringItem + '</a>';
          newString.push(twitterUserLink);
        } else {
          newString.push(stringItem);
        }
      }
      return newString.join(' ');
    },

    sanitizeTwitterUser: function(string) {
      string = string.replace('@', '');

      var quoteArray = string.split('\'');
      if (quoteArray.length > 1) {
        return quoteArray[0];
      }

      var colonArray = string.split(':');
      if (colonArray.length > 1) {
        return colonArray[0];
      }

      var semicolonArray = string.split(';');
      if (semicolonArray.length > 1) {
        return semicolonArray[0];
      }

      return string;
    },

    searchTweetForLinks: function(tweet) {
      var tweetArray = tweet.split(' ');
      var newTweet = [];
      for (var i = 0; i < tweetArray.length; i++) {
        var item = tweetArray[i];
        if (item.search('http:') != -1 ||
            item.search('https:') != -1 &&
            item.search('<a') == -1) {
          var itemArray = item.split('\n');
          for (var j = 0; j < itemArray.length; j++) {
            var link = itemArray[j];
            if (link.search('http') != -1) {
              link = '<a href="' + link + '" target="_new">' +
                  link + '</a>';
              newTweet.push(link);
            } else {
              newTweet.push(link);
            }
          }
        } else {
          newTweet.push(item);
        }

      }
      return newTweet.join(' ');
   }
};
