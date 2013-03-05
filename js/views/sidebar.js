(function() {

  var BDT = window.BDT;

  BDT.views.Sidebar = Backbone.View.extend({

    template: BDT.templates['sidebar'],

    render: function() {
      this.$el.empty().append(this.template());
      this.$el.attr('tabindex', 0);
      this.trigger('select', '#general');
      return this;
    },

    events: {
      'click a': 'selectItem',
      'keydown': 'keydown'
    },

    selectItem: function(evt) {
      evt.preventDefault();
      var anchor = $(evt.currentTarget);
      anchor.parent().addClass('selected').siblings().removeClass('selected');
      this.trigger('select', anchor.attr('href'));
    },

    keydown: function(e) {
      switch(e.keyCode) {
        case 74: // j
        case 40: // down
          this.nextItem();
          break;
        case 75: // k
        case 38: // up
          this.previousItem();
          break;
      }
    },

    nextItem: function() {
      var selected = this.$('.selected');
      if (selected.next().size() == 0) return;
      var next = selected.removeClass('selected').next().addClass('selected');
      this.trigger('select', $('a', next).attr('href'));
    },

    previousItem: function() {
      var selected = this.$('.selected');
      if (selected.prev().size() == 0) return;
      var prev = selected.removeClass('selected').prev().addClass('selected');
      this.trigger('select', $('a', prev).attr('href'));
    }

  });

})();
