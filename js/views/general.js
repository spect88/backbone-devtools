(function() {

  var BDT = window.BDT;

  BDT.views.General = Backbone.View.extend({

    className: 'general',
    template: BDT.templates['general'],

    events: {
      'change [name="inject"]': 'toggleInjection',
      'change [name="timeout"]': 'updateTimeout'
    },

    render: function() {
      this.$el.empty().append(this.template());
      BDT.page.eval('isInjectionEnabled', [], function(enabled) {
        $('[name="inject"]').prop('checked', enabled);
        BDT.page.eval('getTimeout', [], function(ms){
          if (ms !== undefined) {
            $('[name="timeout"]').val(ms/1000);
          }
        })
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
    },

    updateTimeout: function (evt) {
      var seconds = parseFloat(this.$(evt.currentTarget).val());
      var ms = Math.round(seconds * 1000);
      BDT.page.eval('updateTimeout', [ms]);
    }

  });

})();
