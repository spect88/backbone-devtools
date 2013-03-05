(function() {

  var BDT = window.BDT;

  BDT.collections.Logs = Backbone.Collection.extend({
    
    initialize: function(type) {
      this.type = type;

      this.notificationReceived = _.bind(this.notificationReceived, this);
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

    waitForNotifications: function() {
      BDT.port.onMessage.addListener(this.notificationReceived);
    },

    stopWaiting: function() {
      BDT.port.onMessage.removeListener(this.notificationReceived);
    },

    notificationReceived: function(message) {
      if ((message['msg'] !== 'new_logs') || (message['type'] !== this.type)) {
        return;
      }
      this.fetchNew();
    }

  });

})();
