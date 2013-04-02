(function() {

  var BDT = window.BDT;

  BDT.collections.Logs = Backbone.Collection.extend({
    
    initialize: function(type) {
      this.type = type;
    },

    sync: function(method, collection, options) {
      if (method !== 'read')
        throw new Error("Illegal sync method for a read-only collection");

      var deferred = new $.Deferred();

      BDT.page.eval(
        'getData',
        [collection.type, options.incremental ? collection.size() : 0],
        function(resp) {
          if (options.success) options.success(collection, resp, options);
          deferred.resolveWith(resp);
          collection.trigger('sync', collection, resp, options);
        }
      );

      collection.trigger('request', collection, deferred, options);

      return deferred.promise();
    },

    fetchNew: function() {
      options = {
        incremental: true,
        success: function(collection, resp, options) {
          collection.add(resp);
        }
      };

      return this.sync('read', this, options);
    },

    startPolling: function() {
      var this_ = this;
      this.polling = window.setInterval(function() {
        this_.fetchNew();
      }, 200);
    },

    stopPolling: function() {
      this.polling = window.clearInterval(this.polling);
    }

  });

})();
