(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['sidebar'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<ul>\n  <li class=\"selected\"><a href=\"#general\">General</a></li>\n  <li><a href=\"#events\">Events</a></li>\n  <li><a href=\"#syncs\">Syncs</a></li>\n  <li><a href=\"#views\">View-DOM Binding</a></li>\n  <li><a href=\"#instances\">Instantiated Objects</a></li>\n</ul>\n";});
})();
