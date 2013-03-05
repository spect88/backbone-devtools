(function() {

  // attach.js needs this url to get the other files
  var url = chrome.extension.getURL('js/inject/');
  document.documentElement.setAttribute('bdt-path', url);

  // inject attach.js which can access existing JavaScript
  var s = document.createElement('script');
  s.src = chrome.extension.getURL("js/inject/attach.js");
  s.onload = function() {
    this.parentNode.removeChild(this);
  };
  (document.head||document.documentElement).appendChild(s);

  // pass the message from logger.js to background.js
  // which will notify the panel that new logs are available
  document.addEventListener('bdt:message', function(e) {
    var message = e.detail;
    try {
      chrome.extension.sendMessage(message);
    } catch(e) {
      // fail silently
    }
  });

})();
