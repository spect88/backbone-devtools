(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['general'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<h1>Backbone Developer Tools</h1>\n\n<form>\n  <input type=\"checkbox\" name=\"inject\" id=\"inject_checkbox\" /><label for=\"inject_checkbox\">Inject Backbone.Debug (changing this will cause a page reload)</label>\n</form>\n\n<p>App requirement for BDT to work:</p>\n<ul>\n  <li>window.Backbone available on DOMContentLoaded or DOMNodeInserted following DOMContentLoaded</li>\n</ul>\n\n<h1>Features</h1>\n<ul>\n  <li>$view console variable after inspecting a DOM Element (points to the closest View instance)</li>\n  <li>Containing Views Hierarchy in Elements panel</li>\n  <li>Logs in this panel</li>\n</ul>\n\n<h1>Troubleshooting</h1>\n<p>If injecting doesn&apos;t work for some reason (eg. your project uses AMD), one thing you can try is modifying Backbone.Debug and the custom logger. Just include them in your project, making sure that the logger is reachable at window.Backbone.debug.logger</p>\n<p>Report any issues on <a href=\"http://github.com/spect88/backbone-devtools\" target=\"_blank\">GitHub</a> (pull requests are welcome as well).</p>\n";});
})();
