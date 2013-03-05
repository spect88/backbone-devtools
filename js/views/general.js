(function() {

  var BDT = window.BDT;

  BDT.views.General = Backbone.View.extend({

    className: 'general',
    template: BDT.templates['general'],

    events: {
      'change [name="inject"]': 'toggleInjection'
    },

    render: function() {
      this.$el.empty().append(this.template());
      BDT.page.eval('isInjectionEnabled', [], function(enabled) {
        $('[name="inject"]').prop('checked', enabled);
      });
      return this;
    },

    toggleInjection: function(evt) {
      var on = (this.$(evt.currentTarget).is(':checked'));
      
      BDT.page.eval(
        on ? 'enableInjection' : 'disableInjection',
        [],
        function() {
          chrome.devtools.inspectedWindow.reload();
        }
      );
    }

  });

})();
