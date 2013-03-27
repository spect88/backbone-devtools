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

  var inject = function() {
    if (!window.Backbone) {
      if (require) {
        require(['backbone'], function(backbone){
          if (!backbone) {
            console.error('[Backbone Dev Tools] Couldn\'t find Backbone');
            return;
          }
          inject();
        });
      }
      else {
        console.error('[Backbone Dev Tools] Couldn\'t find Backbone');
      }
      return;
    }

    injectScript("backbone.debug.js", function() {
      injectScript("logger.js", function() {
        console.log('[Backbone Dev Tools] Injected Backbone.Debug');
      });
    });
  };

  if (window.sessionStorage['_backbone_debug_injection'] === 'enabled') {
    document.addEventListener('DOMContentLoaded', inject);
  }

})();
