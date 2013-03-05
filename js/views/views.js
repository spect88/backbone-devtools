(function() {

  var BDT = window.BDT;

  BDT.views.Views = BDT.views.List.extend({

    className: 'views',

    headers: [
      {'class': 'timestamp', 'text': 'Timestamp'},
      {'class': 'object', 'text': 'Object'},
      {'class': 'element', 'text': 'DOM Element'}
    ],

    initialize: function() {
      this.setCollection(new BDT.collections.Logs('view'));
    }

  });

})();
