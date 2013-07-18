(function() {

  var BDT = window.BDT;

  BDT.collections.Logs = Backbone.Collection.extend({
    
    initialize: function(type) {
      this.type = type;
    },

    fetchingLimit: 20,
    pollingInterval: 200,

    sync: function(method, collection, options) {
      var operation;
      var args = [collection.type];

      switch (method) {
        case 'read': operation = 'getData'; break;
        case 'delete': operation = 'clearData'; break;
        default: throw new Error("Illegal sync method");
      }

      var deferred = new $.Deferred();

      if (method == 'read') {
        args.push(options.incremental ? collection.size() : 0);
        args.push(options.limit || this.fetchingLimit);
      }

      BDT.page.eval(
        operation,
        args,
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
      }, this.pollingInterval);
    },

    stopPolling: function() {
      this.polling = window.clearInterval(this.polling);
    },

    clear: function() {
      this.stopPolling();

      options = {
        success: function(collection, resp, options) {
          collection.reset();
          collection.startPolling();
        }
      };

      return this.sync('delete', this, options);
    }

  });

})();
