(function() {

  var BDT = window.BDT;

  BDT.views.List = Backbone.View.extend({

    className: 'list',
    template: BDT.templates['list'],
    item_template: BDT.templates['list_item'],

    headers: null,
    collection: null,

    toolbar: {
      'clear': 'clearLogs'
    },

    setCollection: function(collection) {
      this.collection = collection;
      this.collection.fetch();
      this.listenTo(this.collection, 'reset', this.render);
      this.listenTo(this.collection, 'add', this.addItem);
      this.collection.startPolling();
    },

    render: function() {
      this.saveScrollOffset();
      this.$el.empty().append(this.template({
        headers: this.headers
      }));
      var view = this;
      this.collection.each(function(model) {
        view.addItem(model);
      });
      this.restoreScrollOffset();
      return this;
    },

    addItem: function(model) {
      this.saveScrollOffset();
      this.$('.data').append(
        this.item_template({
          headers: this.headers,
          item: model.toJSON()
        })
      );
      this.restoreScrollOffset();
      return this;
    },

    remove: function() {
      Backbone.View.prototype.remove.apply(this, arguments);
      this.collection.stopPolling();
      this.collection = null;
      return this;
    },

    saveScrollOffset: function() {
      var div = this.$('.scrollable-data');
      var contentHeight = $('table', div).height();
      var bottomScrollTop = contentHeight - div.height();

      this.scrolledToTheBottom = (div.scrollTop() >= bottomScrollTop);
      this.previousScrollTop = div.scrollTop();
      return this;
    },

    restoreScrollOffset: function() {
      var div = this.$('.scrollable-data');

      if (!this.scrolledToTheBottom) {
        div.scrollTop(this.previousScrollTop);
        return;
      }

      var contentHeight = $('table', div).height();
      var bottomScrollTop = contentHeight - div.height();

      div.scrollTop(bottomScrollTop);
      return this;
    },

    clearLogs: function(evt) {
      this.collection.clear();
    }
  });

})();
