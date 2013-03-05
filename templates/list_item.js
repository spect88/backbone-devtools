(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['list_item'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<tr>\n  <td class=\"";
  stack1 = depth0.headers;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1[0];
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1['class'];
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.item;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1['t'];
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</td>\n  <td class=\"";
  stack1 = depth0.headers;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1[1];
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1['class'];
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.item;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.c1;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</td>\n  <td class=\"";
  stack1 = depth0.headers;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1[2];
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1['class'];
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.item;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.c2;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</td>\n  <td></td>\n</tr>\n";
  return buffer;});
})();
