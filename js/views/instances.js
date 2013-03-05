(function() {

  var BDT = window.BDT;

  BDT.views.Instances = BDT.views.List.extend({

    className: 'instances',

    headers: [
      {'class': 'timestamp', 'text': 'Timestamp'},
      {'class': 'object', 'text': 'Object'},
      {'class': 'type', 'text': 'Type'}
    ],

    initialize: function() {
      this.setCollection(new BDT.collections.Logs('instance'));
    }
  });

})();
