var Friends = {
  friendsList: [],
  $username: $('#chats .chats .username'),
  $frnd: $('#friends'),

  initialize: function() {
    Friends.toggleStatus();

  },

  toggleStatus: function() {
    $('#chats').on('click', '.username', function(event) {
      var username = $(event.target).text();
      if (confirm(`Do you like to add ${username} as your friend`)) {
        Friends.renderFriend(username);
        $('.username').each(function() {
          var currentUsername = $(this).text().trim();
          if (currentUsername === username) {
            $(this).css('color', 'darkorchid');
            $(this).siblings().css('background-color', '#e5eff1');
            $(this).siblings().css('color', 'blue');
          }
        });

        Friends.friendsList.push(username);
      }

    });
  },

  renderFriend: function(frnd) {
    if (Friends.friendsList.indexOf(frnd) === -1) {
      Friends.$frnd.append(`<li class="friends-list">${frnd}</li>`);
    }
  }

};

