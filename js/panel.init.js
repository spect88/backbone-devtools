$(function() {

  var BDT = window.BDT;

  var panel = new BDT.views.Panel({ el: $('body') });

  // setup port for notifications
  (function setupPort() {
    BDT.port = chrome.extension.connect({
      name: "devtools:" + chrome.devtools.inspectedWindow.tabId
    });
    BDT.port.onDisconnect.addListener(setupPort);
  })();

 
});
