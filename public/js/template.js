this["MyApp"] = this["MyApp"] || {};
this["MyApp"]["JST"] = this["MyApp"]["JST"] || {};

this["MyApp"]["JST"]["main/default"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div>this is default main view</div>\n";
  });

this["MyApp"]["JST"]["main/top"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div>this is top main view</div>\n<a href=\"#/my/\">my page</a>\n";
  });

this["MyApp"]["JST"]["sub/my"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"subcontent\">\n  <div>this is my sub view</div>\n  <a href=\"#/\">top</a>\n</div>\n";
  });

this["MyApp"]["JST"]["sub/top"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


  return buffer;
  });