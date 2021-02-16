var Rooms = {
  // use if template is {key: value}
  render: _.template(`
      <option target='_blank'><%-roomname%></option>
    `),


  userRoom: '',
  firstOption: '',

  initialize: function() {
    $('select>option').on('contextmenu', Rooms.roomsContextMenu);
  },


  add: function() {
    Rooms.userRoom = prompt('Please enter a new room');
    if (Rooms.userRoom === '' || Rooms.userRoom === null) {
      $('#rooms select option[value = null]').remove();
    } else if (RoomsView.allRooms.indexOf(Rooms.userRoom) >= 0) {
      prompt('That room already exists, please enter a new room name');
    } else {
      RoomsView.$select.prepend(`<option selected>${Rooms.userRoom.substring(0, 25)}</option>`);
      MessagesView.$chats.empty();

      var option = $('select option:selected');
      Rooms.firstOption = $.map(option, function(option) {
        return option.value;
      });
      Rooms.firstOption = Rooms.firstOption[0];
      console.log(Rooms.firstOption, 'firstOption from dropdown select');

    }
  },

  /* render: function(room) {
    RoomsView.$select.append(`<option>${room}</option>`);
  }, */

  /* addUserRoom: function(results) {
    results.forEach(function(matchRoom) {
      if (matchRoom.roomname === Rooms.userRoom) {
        MessagesView.renderMessage(matchRoom);
      }
    });

  } */

  roomsContextMenu: function() {
    var windowOptions = 'statusbar=no, height=300, width=600, resizable=true';
    var refWindow = window.open('', 'User Room', windowOptions);
    refWindow.focus();

  }

};
