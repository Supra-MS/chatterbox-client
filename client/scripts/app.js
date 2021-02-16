var App = {

  $spinner: $('.spinner img'),
  appdata: [],
  username: 'Anonymous',

  initialize: function() {
    App.username = window.location.search.substr(10);

    FormView.initialize();
    RoomsView.initialize();
    MessagesView.initialize();
    Friends.initialize();
    Rooms.initialize();

    // Fetch initial batch of messages
    App.startSpinner();
    App.fetch(App.stopSpinner);

  },

  fetch: function(callback = () => {}) {
    Parse.readAll((data) => {
      App.appdata = data.results;
      // examine the response from the server request:
      console.log('Data:', App.appdata);
      MessagesView.render(App.appdata);
      RoomsView.render(App.appdata);
      callback();
    });
  },

  fetchRoom: function() {
    Parse.readAll((data) => {
      console.log('Fetch', data);
      App.appdata = data.results;
      RoomsView.enterRoom(App.appdata);

    });
  },

  startSpinner: function() {
    App.$spinner.show();
    FormView.setStatus(true);
  },

  stopSpinner: function() {
    App.$spinner.fadeOut('fast');
    FormView.setStatus(false);
  }
};
