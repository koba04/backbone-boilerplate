require=function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);throw new Error("Cannot find module '"+g+"'")}var j=c[g]={exports:{}};b[g][0].call(j.exports,function(a){var c=b[g][1][a];return e(c?c:a)},j,j.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({"6MciEj":[function(a,b){"use strict";var c,d={}.hasOwnProperty,e=function(a,b){function c(){this.constructor=a}for(var e in b)d.call(b,e)&&(a[e]=b[e]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a};c=function(a){function b(){b.__super__.constructor.apply(this,arguments),this.addInitializer(function(a){return function(){return a.addRegions({content:"#content"}),$.ajaxSettings.timeout=5e3,$.ajaxSettings.cache=!1}}(this)),this.hogehoge="fooooooooooooooooooooooooooo",this.on("initialize:after",function(){return Backbone.History.started?void 0:Backbone.history.start()}),$(function(a){return function(){return a.start()}}(this))}return e(b,a),b}(Backbone.Marionette.Application),b.exports=new c},{}],"myapp/app":[function(a,b){b.exports=a("6MciEj")},{}],"+chpI0":[function(a,b){"use strict";var c,d={}.hasOwnProperty,e=function(a,b){function c(){this.constructor=a}for(var e in b)d.call(b,e)&&(a[e]=b[e]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a};c=a("myapp/models/base"),b.exports=function(a){function b(){return b.__super__.constructor.apply(this,arguments)}return e(b,a),b.prototype.model=c,b}(Backbone.Collection)},{"myapp/models/base":"3kKKBP"}],"myapp/collections/base":[function(a,b){b.exports=a("+chpI0")},{}],gmSmhJ:[function(a,b){"use strict";var c,d,e={}.hasOwnProperty,f=function(a,b){function c(){this.constructor=a}for(var d in b)e.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a};c=a("myapp/collections/base"),d=a("myapp/models/user"),b.exports=function(a){function b(){return b.__super__.constructor.apply(this,arguments)}return f(b,a),b.prototype.url="/users/",b.prototype.model=d,b}(c)},{"myapp/collections/base":"+chpI0","myapp/models/user":"b51ifI"}],"myapp/collections/users":[function(a,b){b.exports=a("gmSmhJ")},{}],VvtH1o:[function(a,b){"use strict";var c,d,e,f,g,h;c=a("myapp/app"),h=a("myapp/models/user"),g=a("myapp/views/layouts/top"),d=a("myapp/views/layouts/error"),f=a("myapp/views/layouts/my"),e=a("myapp/views/layouts/friends"),b.exports={top:function(){return c.content.show(new g)},error:function(){return c.content.show(new d)},my:function(){var a;return a=new h({id:1}),a.fetch().done(function(){return c.content.show(new f({model:a}))})},friends:function(){return(new e).show()}}},{"myapp/app":"6MciEj","myapp/models/user":"b51ifI","myapp/views/layouts/error":"BpCbbU","myapp/views/layouts/friends":"zkT+dK","myapp/views/layouts/my":"JU/+M7","myapp/views/layouts/top":"33Bl1V"}],"myapp/controller":[function(a,b){b.exports=a("VvtH1o")},{}],"3kKKBP":[function(a,b){"use strict";var c={}.hasOwnProperty,d=function(a,b){function d(){this.constructor=a}for(var e in b)c.call(b,e)&&(a[e]=b[e]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a};b.exports=function(a){function b(){return b.__super__.constructor.apply(this,arguments)}return d(b,a),b}(Backbone.Model)},{}],"myapp/models/base":[function(a,b){b.exports=a("3kKKBP")},{}],b51ifI:[function(a,b){"use strict";var c,d={}.hasOwnProperty,e=function(a,b){function c(){this.constructor=a}for(var e in b)d.call(b,e)&&(a[e]=b[e]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a};c=a("myapp/models/base"),b.exports=function(a){function b(){return b.__super__.constructor.apply(this,arguments)}return e(b,a),b.prototype.urlRoot="/users/",b.prototype.initialize=function(a){return b.__super__.initialize.apply(this,arguments),this.name=a.name},b}(c)},{"myapp/models/base":"3kKKBP"}],"myapp/models/user":[function(a,b){b.exports=a("b51ifI")},{}],u5GI7r:[function(a,b){"use strict";var c,d,e={}.hasOwnProperty,f=function(a,b){function c(){this.constructor=a}for(var d in b)e.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a};c=a("myapp/controller"),d=function(a){function b(){return b.__super__.constructor.apply(this,arguments)}return f(b,a),b.prototype.controller=c,b.prototype.appRoutes={"":"top","error/":"error","my/":"my","friends/":"friends"},b.prototype.assign=function(a){return Backbone.history.navigate("#"+a,{replace:!1})},b.prototype.replace=function(a){return Backbone.history.navigate("#"+a,{replace:!0})},b}(Backbone.Marionette.AppRouter),b.exports=new d},{"myapp/controller":"VvtH1o"}],"myapp/router":[function(a,b){b.exports=a("u5GI7r")},{}],tLgW31:[function(a,b){"use strict";b.exports={constructor:function(){var a,b,c,d,e,f,g,h;f=this.helper;for(b in f)a=f[b],Handlebars.registerHelper(b,a);for(g=this.particles,h=[],d=0,e=g.length;e>d;d++)c=g[d],h.push(Handlebars.registerPartial(c,JST["particle/"+c]));return h},helper:{upperCase:function(a){return a.toUpperCase()}},particles:["user"]}},{}],"myapp/template":[function(a,b){b.exports=a("tLgW31")},{}],"myapp/views/collections/friends":[function(a,b){b.exports=a("DyGAem")},{}],DyGAem:[function(a,b){"use strict";var c,d={}.hasOwnProperty,e=function(a,b){function c(){this.constructor=a}for(var e in b)d.call(b,e)&&(a[e]=b[e]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a};c=a("myapp/views/items/friend"),b.exports=function(a){function b(){return b.__super__.constructor.apply(this,arguments)}return e(b,a),b.prototype.itemView=c,b}(Backbone.Marionette.CollectionView)},{"myapp/views/items/friend":"7HEV7I"}],"myapp/views/items/friend":[function(a,b){b.exports=a("7HEV7I")},{}],"7HEV7I":[function(a,b){"use strict";var c={}.hasOwnProperty,d=function(a,b){function d(){this.constructor=a}for(var e in b)c.call(b,e)&&(a[e]=b[e]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a};b.exports=function(a){function b(){return b.__super__.constructor.apply(this,arguments)}return d(b,a),b.prototype.template=JST["items/friend"],b}(Backbone.Marionette.ItemView)},{}],"myapp/views/layouts/error":[function(a,b){b.exports=a("BpCbbU")},{}],BpCbbU:[function(a,b){"use strict";var c={}.hasOwnProperty,d=function(a,b){function d(){this.constructor=a}for(var e in b)c.call(b,e)&&(a[e]=b[e]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a};b.exports=function(a){function b(){return b.__super__.constructor.apply(this,arguments)}return d(b,a),b.prototype.template=JST["layouts/error"],b}(Backbone.Marionette.Layout)},{}],"zkT+dK":[function(a,b){"use strict";var c,d,e,f={}.hasOwnProperty,g=function(a,b){function c(){this.constructor=a}for(var d in b)f.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a};c=a("myapp/app"),e=a("myapp/collections/users"),d=a("myapp/views/collections/friends"),b.exports=function(a){function b(){return b.__super__.constructor.apply(this,arguments)}return g(b,a),b.prototype.template=JST["layouts/friends"],b.prototype.regions={friends:"#friends"},b.prototype.show=function(){var a;return a=new e,a.fetch().done(function(b){return function(){return c.content.show(b),b.friends.show(new d({collection:a}))}}(this))},b}(Backbone.Marionette.Layout)},{"myapp/app":"6MciEj","myapp/collections/users":"gmSmhJ","myapp/views/collections/friends":"DyGAem"}],"myapp/views/layouts/friends":[function(a,b){b.exports=a("zkT+dK")},{}],"JU/+M7":[function(a,b){"use strict";var c={}.hasOwnProperty,d=function(a,b){function d(){this.constructor=a}for(var e in b)c.call(b,e)&&(a[e]=b[e]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a};b.exports=function(a){function b(){return b.__super__.constructor.apply(this,arguments)}return d(b,a),b.prototype.template=JST["layouts/my"],b}(Backbone.Marionette.Layout)},{}],"myapp/views/layouts/my":[function(a,b){b.exports=a("JU/+M7")},{}],"myapp/views/layouts/top":[function(a,b){b.exports=a("33Bl1V")},{}],"33Bl1V":[function(a,b){"use strict";var c={}.hasOwnProperty,d=function(a,b){function d(){this.constructor=a}for(var e in b)c.call(b,e)&&(a[e]=b[e]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a};b.exports=function(a){function b(){return b.__super__.constructor.apply(this,arguments)}return d(b,a),b.prototype.template=JST["layouts/top"],b}(Backbone.Marionette.Layout)},{}],29:[function(){},{}]},{},["6MciEj","+chpI0","gmSmhJ","VvtH1o","3kKKBP","b51ifI","u5GI7r","tLgW31","DyGAem","7HEV7I","BpCbbU","zkT+dK","JU/+M7","33Bl1V"]);