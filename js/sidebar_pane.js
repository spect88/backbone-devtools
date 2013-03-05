(function() {

  var BDT = window.BDT;

  BDT.sidebarPane = {
  
    update: function(sidebar) {
      var functionDef = BDT.page.getBackboneViews.toString();
      sidebar.setExpression("(" + functionDef + ")()");
    },

    create: function() {
      chrome.devtools.panels.elements.createSidebarPane(
        "Backbone Views",
        function(sidebar) {
          BDT.sidebarPane.update(sidebar);
          chrome.devtools.panels.elements.onSelectionChanged.addListener(
            function() { BDT.sidebarPane.update(sidebar); }
          );
        }
      );
    }
  
  };

})();
