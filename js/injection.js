(function() {

  var BDT = window.BDT;

  BDT.injection = {

    enable: function() {
      chrome.devtools.inspectedWindow.reload(
        true, null, "(function(){ console.log(window.Backbone); })()"
      );
    },

    disable: function() {
      chrome.devtools.inspectedWindow.reload();
    }

  };

})();
