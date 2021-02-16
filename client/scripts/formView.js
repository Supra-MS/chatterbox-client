var FormView = {

  $form: $('form'),

  initialize: function() {
    FormView.$form.on('submit', FormView.handleSubmit);
  },

  handleSubmit: function(event) {
    // Stop the browser from submitting the form
    event.preventDefault();
    Messages.text = $('form').find('#message').val(); // || Messages.text
    Messages.roomname = $('#roomname option:selected').text() || Messages.roomname;

    console.log('Roomname: ', Messages.roomname, 'Text: ', Messages.text);

    $('#chats').empty();
    if (Messages.roomname === 'Lobby') {
      Parse.create(Messages, function() {
        App.fetch(App.stopSpinner);
      });
      console.log(Messages, 'inside === Lobby');
    } else {
      Parse.create(Messages, function() {
        // RoomsView.enterRoom();
        App.fetchRoom();
      });
      console.log(Messages, 'inside === specific rooms');
    }
    $('#message').val('');
  },

  setStatus: function(active) {
    var status = active ? 'true' : null;
    FormView.$form.find('input[type=submit]').attr('disabled', status);
  }

};