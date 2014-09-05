var jspro = {

  globals: {

      feedIndex: 0,

      feedIndexIncrement: 20,

      baseFeedUrl: '/feed/all/',

      userId: $('#userId').html(),

      starredList: [],

      currentMode: false,

      modes: {

          TWITTER: 'twitter',
          BLOG: 'blog',
          ALL: 'all'

      }

  },

  goto: {

      home: function() {
          window.location.href = '/';
      },

      login: function() {
          window.location.href = '/login';
      },

      account: function() {
          window.location.href = '/account';
      },

      logout: function() {
          window.location.href = '/logout';
      },

      menu: function() {
          jspro.render.menu();
      }

  },

  getUsersStarredItems: function(callback) {
      var url = '/feed/allstarred/' + this.globals.userId;
      $.ajax({
         url: url,
         type: 'GET',
         success: function(data){
             jspro.globals.starredList = data;
             if (callback) {
                callback();
             }
         },
         error: function(err) {
             jspro.uiMessage(err, 'messageBar--error');
         }
      });
  },

  startJsing: function() {
      if (this.globals.userId) {
          this.getUsersStarredItems(function() {
              return jspro.render.getFeedItems();
          });
      } else {
          jspro.render.getFeedItems();
      }
  }

};
