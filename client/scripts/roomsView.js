var RoomsView = {
  $button: $('#rooms button'),
  $addRoom: $('#rooms .addroom'),
  $select: $('#rooms select'),
  allRooms: [],
  selectedRooms: [],

  initialize: function () {
    RoomsView.$addRoom.on('click', Rooms.add);
    RoomsView.$select.on('change', RoomsView.enterRoom);
    // To pass the specrunner uncomment below to invoke the add function
    // Rooms.add();
  },

  render: function (results) {
    results.forEach(function (roomObj) {

      if (roomObj.roomname === '' || !roomObj.roomname) {
        roomObj.roomname = Messages.roomname;
      }

      if (roomObj.hasOwnProperty('roomname')) {
        var escapedStr = roomObj.roomname.trim();
        // var escapedStr = roomObj.roomname.replace(/[^a-z0-9]/gi, '');
        if (RoomsView.allRooms.indexOf(escapedStr) === -1) {
          RoomsView.allRooms.push(escapedStr);
          RoomsView.renderRoom(roomObj);
          // RoomsView.renderRoom(escapedStr);
          RoomsView.allRooms.sort();
        }

      }
    });
  },

  renderRoom: function (room) {
    var roomname = room.roomname.substring(0, 20);
    room.roomname = roomname;
    RoomsView.$select.append(Rooms.render(room));
  },


  enterRoom: function () {
    // RoomsView.$select.on('change', function() {
    var selectedRoom = RoomsView.$select.children('option:selected').text();

    $('select').trigger('chosen:updated');
    console.log(selectedRoom, 'selectedRoom');
    MessagesView.$chats.empty();
    RoomsView.selectedRooms = [];

    if (selectedRoom === 'Lobby') {
      App.fetch();
      $('#message').val('');
    }

    App.appdata.forEach(function (matchroom) {
      matchroom.roomname = matchroom.roomname;
      if (matchroom.roomname === selectedRoom && matchroom.roomname !== 'Lobby') {
        MessagesView.renderMessage(matchroom);
        RoomsView.selectedRooms.push(matchroom);
      }

    });

    console.log(RoomsView.selectedRooms, 'selectedRooms array obj');
    console.log('=================================');

    /*  if (selectedRoom === Rooms.firstOption) {
      App.fetchRoom();
    } */

    // });
  }

};
