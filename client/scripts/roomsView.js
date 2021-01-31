var RoomsView = {

  $button: $('#rooms button'),
  $addroom: $('#rooms .addroom'),
  $select: $('#rooms select'),
  allRooms: [],

  initialize: function() {
    RoomsView.$addroom.on('click', Rooms.add);
    //RoomsView.$button.on('click', Rooms.add);

  },

  render: function(results) {
    results.forEach(roomObj => {
      if (roomObj.roomname === '' || !roomObj.roomname) {
        roomObj.roomname = Messages.roomname;
      }
      if (roomObj.hasOwnProperty('roomname')) {
        console.log(roomObj.roomname)
        var escapedString = roomObj.roomname.trim();
        if (RoomsView.allRooms.indexOf(escapedString) === -1) {
          RoomsView.allRooms.push(escapedString);
          RoomsView.renderRoom(escapedString);
        }
      }

    });
  },

  renderRoom: function(room) {
    RoomsView.$select.append(Rooms.render(room));
  },

  enterRoom: function(results) {
    RoomsView.$select.on('change', function() {
      var selectedRoom = RoomsView.$select.children('option:selected').text();
      MessagesView.$chats.empty();
      if (selectedRoom !== 'All Channels') {
        Messages.roomname = selectedRoom;
      }
      if (selectedRoom === 'All Channels') {
        MessagesView.refresh();
      }
      results.forEach(function(matchRoom) {
        if (matchRoom.roomname === selectedRoom && matchRoom.roomname !== 'All Channels') {
          MessagesView.renderMessage(matchRoom);
        }

      });
    });

  }

};

