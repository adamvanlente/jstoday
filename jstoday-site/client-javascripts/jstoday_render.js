var jspro = jspro || {};

jspro.render = {

    getFeedItems: function() {

      var url = '/feed/all/' + jspro.globals.feedIndex;
      console.log(url);

      $.ajax({
         url: url,
         type: 'GET',
         success: function(data){
             console.log(data);
         },
         error: function(err) {
             jspro.uiMessage(err, 'messageBar--error');
         }
      });

    }

};
