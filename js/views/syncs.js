(function() {

  var BDT = window.BDT;

  BDT.views.Syncs = BDT.views.List.extend({

    className: 'syncs',

    headers: [
      {'class': 'timestamp', 'text': 'Timestamp'},
      {'class': 'object', 'text': 'Object'},
      {'class': 'method', 'text': 'Method'}
    ],

    initialize: function() {
      this.setCollection(new BDT.collections.Logs('sync'));
    }
  });

})();
