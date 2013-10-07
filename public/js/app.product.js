(function(){!function(){"use strict";var a;return a=window.MyApp,a.Model={},a.Collection={},a.View={Main:{},Sub:{}},a.Util={}}()}).call(this),function(){!function(){"use strict";var a;return a=function(){function a(){$.ajaxSettings.timeout=5e3,$.ajaxSettings.xhr=function(){var a;return a=new XMLHttpRequest}}return a.prototype.get=function(a,b){return this._ajax("get",a,b)},a.prototype.post=function(a,b){return this._ajax("post",a,b)},a.prototype.put=function(a,b){return this._ajax("put",a,b)},a.prototype["delete"]=function(a,b){return this._ajax("delete",a,b)},a.prototype._ajax=function(a,b,c){var d;return d=new Deferred,$.ajax({url:b,type:a,data:c,dataType:"json",success:function(a){return d.call(a)},error:function(a){return d.fail(a)}}),d},a}(),MyApp.Util.Http=new a}()}.call(this),function(){!function(){"use strict";return MyApp.Model.User=Backbone.Model.extend}()}.call(this),function(){!function(){"use strict";return MyApp.Collection.Users=Backbone.Collection.extend({urlRoot:"/api/users/",model:MyApp.Model.User})}()}.call(this),function(){!function(){"use strict";return MyApp.View.MainView=Backbone.View.extend({el:$("#mainview"),render:function(a){return this.$el.html(this.tmpl(a))}})}()}.call(this),function(){!function(){"use strict";return MyApp.View.SubView=Backbone.View.extend({el:$("#subview"),render:function(a){return this.$el.html(this.tmpl(a))}})}()}.call(this),function(){!function(){"use strict";return MyApp.View.Main.Default=MyApp.View.MainView.extend({tmpl:MyApp.JST["main/default"],show:function(a){return this.render(a)}})}()}.call(this),function(){!function(){"use strict";return MyApp.View.Main.Top=MyApp.View.MainView.extend({tmpl:MyApp.JST["main/top"]})}()}.call(this),function(){!function(){"use strict";return MyApp.View.Sub.Friends=MyApp.View.SubView.extend({tmpl:MyApp.JST["sub/friends"],show:function(a){return this.render({friends:a})}})}()}.call(this),function(){!function(){"use strict";return MyApp.View.Sub.My=MyApp.View.SubView.extend({tmpl:MyApp.JST["sub/my"],show:function(a){return this.render(a)}})}()}.call(this),function(){!function(){"use strict";return MyApp.View.Sub.Top=MyApp.View.SubView.extend({tmpl:MyApp.JST["sub/top"]})}()}.call(this),function(){!function(){"use strict";var a;return a=Backbone.Router.extend({routes:{"":"top","my/":"my","friends/":"friends"},top:function(){return(new MyApp.View.Sub.Top).render(),(new MyApp.View.Main.Top).render()},my:function(){return MyApp.Util.Http.get("/api/my/").next(function(a){return(new MyApp.View.Main.Default).show(a),(new MyApp.View.Sub.My).show(a)})},friends:function(){return MyApp.Util.Http.get("/api/users/").next(function(a){return(new MyApp.View.Sub.Friends).show(a),MyApp.Util.Http.get("/api/my/").next(function(a){return(new MyApp.View.Main.Default).show(a)})})}}),MyApp.Router=new a,Backbone.history.start()}()}.call(this);