// Load this file immediately after backbone.debug.js

(function() {

  var instanceType = function(object) {
    if (object instanceof Backbone.Model) return 'Model';
    if (object instanceof Backbone.Collection) return 'Collection';
    if (object instanceof Backbone.View) return 'View';
    if (object instanceof Backbone.Router) return 'Router';
    return '';
  };

  var prettyInstanceName = function(object) {
    var name;
    name = object.constructor.name || instanceType(object);
    if (object.cid) {
      name = "" + name + ":" + object.cid;
    }
    return name;
  };

  var prettyElementName = function(elem) {
    if (!elem || !elem.tagName) {
      console.warn('[BDT Warning] Incorrect view.el value');
      return elem + '';
    }
    return elem.tagName.toLowerCase() + ((elem.id && ("#" + elem.id)) || (elem.className && ([''].concat(elem.className.match(/\S+/g) || []).join('.'))));
  };

  var BDTLogger = {

    data: {
      'event': [],
      'view': [],
      'instance': [],
      'sync': []
    },

    log: function(type, object, details) {
      this.data[type].push({
        t: Date.now(),
        c1: (type === 'event') || (type === 'sync')
            ? prettyInstanceName(object)
            : object,
        c2: type === 'view'
            ? prettyElementName(details)
            : details
      });
    },

    getData: function(type, fromIndex, limit) {
      if (!fromIndex) fromIndex = 0;
      if (!limit) limit = 50;
      var untilIndex = fromIndex + limit;
      return this.data[type].slice(fromIndex, untilIndex);
    },

    clearData: function(type) {
      if (!type) {
        for (var key in this.data) this.clearData(key);
        return;
      }
      this.data[type] = [];
    }

  };

  window.Backbone.debug.logger = BDTLogger;

})();
