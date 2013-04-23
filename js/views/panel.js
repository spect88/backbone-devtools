(function() {

  var BDT = window.BDT;

  BDT.views.Panel = Backbone.View.extend({

    initialize: function() {
      this.sidebar = new BDT.views.Sidebar({
        el: this.$('aside')
      });
      this.toolbar = new BDT.views.Toolbar({
        el: this.$('#toolbar'),
        panel: this
      });
      this.listenTo(this.sidebar, 'select', this.displayView);
      this.sidebar.render();
      this.toolbar.render();
    },

    viewMap: {
      '#general':     BDT.views.General,
      '#events':      BDT.views.Events,
      '#views':       BDT.views.Views,
      '#syncs':       BDT.views.Syncs,
      '#instances':   BDT.views.Instances,
    },

    displayView: function(href) {
      if (this.currentView) this.currentView.remove();

      this.currentView = new this.viewMap[href]();
      var element = this.currentView.render().$el;
      this.$('#main').append(element);

      this.trigger('viewChange', this.currentView);
    }

  });

})();
