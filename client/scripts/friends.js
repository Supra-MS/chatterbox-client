var Friends = {
  $username: $('#chats .username'),
  $friend: $('#friends'),
  friendsList: [],

  initialize: function() {
    Friends.toggleStatus();
  },

  toggleStatus: function () {
    $('#chats').on('click', '.username', function(event) {
      var highlightName = $(event.target).text();
      //do you want to add person to friends list
      if (confirm(`Would you like to add ${highlightName} as your friend?`)) {
        Friends.renderFriend(highlightName);
        $('.username').each(function() {
          var currentUser = $(this).text().trim();
          if (currentUser === highlightName) {
            $(this).css('color', 'red');
            $(this).siblings().css('background-color', 'powderblue');
            $(this).siblings().css('color', 'darkorchid');
          }
        });
        Friends.friendsList.push(highlightName);
      }
    });
  },
  renderFriend: function(friend) {
    if (Friends.friendsList.indexOf(friend) === -1) {
      Friends.$friend.append(`<li class="friends-list">${friend}</li>`);
    }
  }

};
