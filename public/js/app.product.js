(function(){!function(){"use strict";var a;return null==window.myapp&&(window.myapp={}),a=window.myapp,a.model={},a.collection={},a.view={main:{},sub:{}},a.util={}}()}).call(this),function(){(function(){"use strict";var a;return a=sessionStorage,this.util.Storage={get:function(b){return a.getItem(b)},set:function(b,c){return a.setItem(b,c)},remove:function(b){return a.removeItem(b)},clear:function(){return a.clear()}}}).call(myapp)}.call(this),function(){(function(){"use strict";var a,b;return a=this.JST,b=function(){function b(){var b,c,d,e,f,g,h;g=this.helper;for(c in g)b=g[c],Handlebars.registerHelper(c,b);for(h=this.particles,e=0,f=h.length;f>e;e++)d=h[e],Handlebars.registerPartial(d,a["particle/"+d])}return b.prototype.get=function(b){return a[b]},b.prototype.helper={upperCase:function(a){return a.toUpperCase()}},b.prototype.particles=["user"],b}(),this.Template=b}).call(myapp)}.call(this),function(){(function(a){"use strict";var b,c,d;return d=this.view,c=this.model,b=this.collection,this.Router=a.Router.extend({routes:{"":"top","my/":"my","friends/":"friends"},start:function(){return a.history.start()},top:function(){return(new d.sub.Top).render(),(new d.main.Top).render()},my:function(){var a;return a=new c.User({id:1}),a.fetch({success:function(){return(new d.main.Default).show(a),(new d.sub.My).show(a)}})},friends:function(){var a;return a=new b.Users,a.fetch({success:function(){var b;return(new d.sub.Friends).show(a),b=new c.User({id:1}),b.fetch({success:function(){return(new d.main.Default).show(b)}})}})}})}).call(myapp,Backbone)}.call(this),function(){(function(){"use strict";var a,b,c;return c=this,b=this.util.Storage,a=function(){function a(){this.template=new c.Template,this.router=new c.Router}return a.prototype.setupAjax=function(){return $.ajaxSettings.timeout=5e3,$.ajaxSettings.cache=!1,$.ajaxSettings.xhr=function(){var a;return a=new XMLHttpRequest}},a.prototype.start=function(){return b.clear(),this.setupAjax(),this.router.start()},a.prototype.sync=function(b,c,d){var e,f,g;if(this instanceof a)throw new Error("sync method is for override model or collection's sync()");return d.error=function(){return window.location="#/error/"},g=function(a){return null!=a&&(d.success=a),Backbone.sync(b,c,d)},null==c.storage?g():(f=d.success,"delete"===b?g(function(a){return c.storage.remove(),f(a)}):"read"===b&&(e=c.storage.get(),null!=e)?f(e):g(function(a){return c.set(a),c.storage.set(a,b),f(a)}))},a}(),c.app=new a}).call(myapp)}.call(this),function(){(function(){"use strict";var a,b,c,d;return c=this.app,d=this.model,b=this.util.Storage,d.Base=Backbone.Model.extend({storage:null,sync:c.sync,createStorage:function(b){return this.storage=new a(b)}}),a=function(){function a(a){this.key=a}return a.prototype.get=function(){var a;return a=b.get(this.key),null!=a?JSON.parse(a):void 0},a.prototype.set=function(a){return b.set(this.key,JSON.stringify(a))},a.prototype.remove=function(){return b.remove(this.key)},a}()}).call(myapp)}.call(this),function(){(function(){"use strict";var a;return a=this.model,a.User=a.Base.extend({urlRoot:"/users/",initialize:function(a){return this.createStorage("model:user:"+a.id),this.name=a.name}})}).call(myapp)}.call(this),function(){(function(){"use strict";var a,b,c,d,e,f;return c=this.app,e=this.model,d=this.collection,f=this.view,b=this.util.Storage,d.Base=Backbone.Collection.extend({storage:null,sync:c.sync,model:e.Base,createStorage:function(b){return this.storage=new a(b,this.model)}}),a=function(){function a(a,b){this.key=a,this.model=b}return a.prototype.get=function(){var a,c,d,e,f,g,h;if(e=b.get(this.key),null!=e){for(c=[],e=JSON.parse(e),g=0,h=e.length;h>g;g++){if(d=e[g],f=new this.model({id:d}),a=f.storage.get(),null==a)return;c.push(a)}return c}},a.prototype.set=function(a,c){var d,e,f,g,h;for(e=[],g=0,h=a.length;h>g;g++)d=a[g],e.push(d.id),f=new this.model({id:d.id}),f.storage.set(d,c);return b.set(this.key,JSON.stringify(e))},a.prototype.remove=function(){var a,c,d,e,f,g;for(c=b.get(this.key),b.remove(this.key),g=[],e=0,f=c.length;f>e;e++)a=c[e],d=new this.model({id:a}),g.push(d.storage.remove());return g},a}()}).call(myapp)}.call(this),function(){(function(){"use strict";var a,b;return b=this.model,a=this.collection,a.Users=a.Base.extend({url:"/users/",model:b.User,initialize:function(){return this.createStorage("collection:users",this.model)}})}).call(myapp)}.call(this),function(){(function(){"use strict";var a;return a=this.view,a.Base=Backbone.View.extend({render:function(a){return this.$el.html(this.tmpl(a))}})}).call(myapp)}.call(this),function(){(function(){"use strict";var a;return a=this.view,a.MainView=a.Base.extend({el:$("#mainview")})}).call(myapp)}.call(this),function(){(function(){"use strict";var a;return a=this.view,a.SubView=a.Base.extend({el:$("#subview")})}).call(myapp)}.call(this),function(){(function(){"use strict";var a,b;return a=this.app,b=this.view,b.main.Default=b.MainView.extend({tmpl:a.template.get("main/default"),show:function(a){return this.render({user:a.toJSON()})}})}).call(myapp)}.call(this),function(){(function(){"use strict";var a,b;return a=this.app,b=this.view,b.main.Top=b.MainView.extend({tmpl:a.template.get("main/top")})}).call(myapp)}.call(this),function(){(function(){"use strict";var a,b;return a=this.app,b=this.view,b.sub.Friends=b.SubView.extend({tmpl:a.template.get("sub/friends"),show:function(a){return this.render({friends:a.toJSON()})}})}).call(myapp)}.call(this),function(){(function(){"use strict";var a,b;return a=this.app,b=this.view,b.sub.My=b.SubView.extend({tmpl:a.template.get("sub/my"),show:function(a){return this.render({user:a.toJSON()})}})}).call(myapp)}.call(this),function(){(function(){"use strict";var a,b;return a=this.app,b=this.view,b.sub.Top=b.SubView.extend({tmpl:a.template.get("sub/top")})}).call(myapp)}.call(this),function(){!function(){"use strict";return myapp.app.start()}()}.call(this);