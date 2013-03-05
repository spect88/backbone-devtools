(function() {

  var ports = {};

  chrome.extension.onConnect.addListener(function(port) {
    if (!/^devtools:\d+/.test(port.name)) return;

    ports[port.name.split(':')[1]] = port;

    port.onDisconnect.addListener(function(port) {
      delete ports[port.portId_];
    });

    port.onMessage.addListener(function(msg) {
      console.log("Devtools["+port.tabId+"]: "+msg);
    });
  });

  // listen to messages from content scripts
  chrome.extension.onMessage.addListener(function(message, sender) {
    // pass the message to the devtools port
    var port = ports[sender.tab.id];
    if (port) port.postMessage(message);
  });

})();
