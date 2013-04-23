(function() {

  var BDT = window.BDT;

  BDT.views.Toolbar = Backbone.View.extend({

    template: BDT.templates['toolbar'],

    initialize: function() {
      this.listenTo(this.options.panel, 'viewChange', this.updateForView);
    },

    render: function() {
      this.$el.empty().append(this.template());
      return this;
    },

    updateForView: function(view) {
      this.$el.off();

      if (!view.toolbar) {
        this.$el.hide();
        return;
      }

      this.$el.show();
      this.$('button').hide();

      _.each(view.toolbar, function(clickHandler, buttonType) {
        this.$('button.' + buttonType).show();
        this.$el.on('click', 'button.' + buttonType, function(evt) {
          if (!(clickHandler in view)) return;
          return view[clickHandler].apply(view, [evt]);
        });
      }, this);
    }

  });

})();
