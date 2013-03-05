(function() {

  var BDT = window.BDT;

  BDT.views.Events = BDT.views.List.extend({

    className: 'events',

    headers: [
      {'class': 'timestamp', 'text': 'Timestamp'},
      {'class': 'object', 'text': 'Object'},
      {'class': 'event', 'text': 'Event'}
    ],

    initialize: function() {
      this.setCollection(new BDT.collections.Logs('event'));
    }

  });

})();
