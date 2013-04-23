(function() {

  var htmlTag = document.documentElement;

  var baseUrl = htmlTag.getAttribute('bdt-path');
  htmlTag.removeAttribute('bdt-path');

  // a simple security check
  if (!/^chrome-extension:\/\/\w+\/js\/inject\/$/.test(baseUrl)) {
    console.error('[Backbone Dev Tools] Incorrect extension URL');
    return;
  }

  var injectScript = function(url, callback) {
    // don't use $.ajax to avoid any prefilters adding headers
    var request = new XMLHttpRequest();
    request.open('GET', baseUrl + url, false);
    request.send();
    eval(request.responseText);
    if (callback) callback();
  };

  var timer;

  var inject = function() {
    var timeout;
    if (!window.Backbone) {
      timeout = parseInt(window.sessionStorage['_backbone_debug_injection_timeout'], 10) || 500;
      // Instead of logging an error immediately, we do the following:
      // (1) Add a listener on `DOMNodeInserted` (which is triggered by require.js)
      // (2) Set a timer for 500ms to log the error
      // Then, an each `DOMNodeInserted` event, we check for window.Backbone.
      // If found, we clear the error log timer, remove the `DOMNodeInserted`
      // listener, and inject backbone.debug.js.
      document.addEventListener('DOMNodeInserted', tryInject);
      timer = setTimeout(function () {
        document.removeEventListener('DOMNodeInserted', tryInject);
        console.error('[Backbone Dev Tools] Couldn\'t find Backbone');
      }, timeout);
      return;
    }

    injectScript("backbone.debug.js", function() {
      injectScript("logger.js", function() {
        console.log('[Backbone Dev Tools] Injected Backbone.Debug');
      });
    });
  };

  var tryInject = function () {
    if (window.Backbone) {
      clearTimeout(timer);
      document.removeEventListener('DOMNodeInserted', tryInject);
      inject();
    }
  };

  if (window.sessionStorage['_backbone_debug_injection'] === 'enabled') {
    document.addEventListener('DOMContentLoaded', inject);
  }

})();
