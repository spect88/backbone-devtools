(function() {

  var BDT = window.BDT;

  BDT.panel = {

    create: function() {
      chrome.devtools.panels.create(
        "Backbone", "img/panel_icon.png", "html/panel.html",
        function(panel) {

        }
      );
    }

  };

})();
