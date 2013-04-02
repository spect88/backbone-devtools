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

})();
