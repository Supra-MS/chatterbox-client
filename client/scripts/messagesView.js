var MessagesView = {

  $chats: $('#chats'),
  $refresh: $('#rooms #refresh'),

  initialize: function() {
    MessagesView.$refresh.on('click', MessagesView.refresh);
  },


  render: function (results) {

    results.forEach(function (messageObj) {

      if (/^%20/g.test(messageObj.username)) {
        messageObj.username = 'Anonymous';
      }

      if (messageObj.username === undefined) {
        messageObj.username = 'Anonymous';
      }

      if (/%20/g.test(messageObj.username)) {
        messageObj.username = messageObj.username.replace(/[%20]/g, ' ');
      }

      if (messageObj.text === '' || messageObj.text === undefined) {
        messageObj.text = Messages.text;
      }

      MessagesView.renderMessage(messageObj);

    });

  },

  renderMessage: function(msg) {
    this.$chats.append(MessageView.render(msg));
  },

  refresh: function(event) {
    MessagesView.$chats.empty();
    // $('select option:contains(--All Rooms--)').prop('selected', true);
    App.fetch();
    $('#message').val('');
  }

};