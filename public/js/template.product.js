this["myapp"] = this["myapp"] || {};
this["myapp"]["JST"] = this["myapp"]["JST"] || {};

this["myapp"]["JST"]["main/default"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<div>";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ":";
  if (stack1 = helpers.age) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.age; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n";
  return buffer;
  }

  buffer += "<div>aaathis is default main view</div>\n";
  stack1 = helpers['with'].call(depth0, depth0.user, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n<a href=\"#/\">top</a>\n";
  return buffer;
  });

this["myapp"]["JST"]["main/top"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div>this is top main view</div>\n<a href=\"#/my/\">my page</a>\n";
  });

this["myapp"]["JST"]["particle/user"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li>";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ":";
  if (stack1 = helpers.age) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.age; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</li>\n";
  return buffer;
  });

this["myapp"]["JST"]["sub/friends"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, stack2, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      ";
  stack1 = self.invokePartial(partials.user, 'user', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  return buffer;
  }

  buffer += "<div class=\"subcontent\">\n  <div>";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.upperCase || depth0.upperCase),stack1 ? stack1.call(depth0, "this is my friends", options) : helperMissing.call(depth0, "upperCase", "this is my friends", options)))
    + "</div>\n  <ul>\n    ";
  stack2 = helpers.each.call(depth0, depth0.friends, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </ul>\n</div>\n";
  return buffer;
  });

this["myapp"]["JST"]["sub/my"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"subcontent\">\n  <div>this is my sub view</div>\n  <p>";
  if (stack1 = helpers.message) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.message; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>\n  <a href=\"#/friends/\">show friends</a>\n</div>\n";
  return buffer;
  });

this["myapp"]["JST"]["sub/term/term1"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div>\n<h1>term1</h1>\n<p>this is term2 content</p>\n\n</div>\n";
  });

this["myapp"]["JST"]["sub/term/term2"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div>\n<h1>term2</h1>\n<p>this isterm2 content</p>\n\n</div>\n";
  });

this["myapp"]["JST"]["sub/top"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


  return buffer;
  });