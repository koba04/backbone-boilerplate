(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  (function() {
    'use strict';
    var App, MyBackbone, myapp, _ref;
    myapp = window.myapp;
    myapp.model = {};
    myapp.collection = {};
    myapp.view = {
      main: {},
      sub: {}
    };
    myapp.util = {};
    App = (function() {
      function App() {}

      return App;

    })();
    MyBackbone = (function(_super) {
      __extends(MyBackbone, _super);

      function MyBackbone() {
        _ref = MyBackbone.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      return MyBackbone;

    })(Backbone);
    myapp.App = new App();
    return myapp.Backbone = MyBackbone;
  })();

}).call(this);

(function() {
  (function(util) {
    'use strict';
    var Http;
    Http = (function() {
      function Http() {
        $.ajaxSettings.timeout = 5000;
        $.ajaxSettings.xhr = function() {
          var xhr;
          xhr = new XMLHttpRequest();
          return xhr;
        };
      }

      Http.prototype.get = function(url, params) {
        return this._ajax('get', url, params);
      };

      Http.prototype.post = function(url, params) {
        return this._ajax('post', url, params);
      };

      Http.prototype.put = function(url, params) {
        return this._ajax('put', url, params);
      };

      Http.prototype["delete"] = function(url, params) {
        return this._ajax('delete', url, params);
      };

      Http.prototype._ajax = function(method, url, params) {
        var deferred;
        deferred = new Deferred();
        $.ajax({
          url: url,
          type: method,
          data: params,
          dataType: 'json',
          success: function(data) {
            return deferred.call(data);
          },
          error: function(xhr, type) {
            return deferred.fail(xhr);
          }
        });
        return deferred;
      };

      return Http;

    })();
    return util.Http = new Http();
  }).call(this, myapp.util);

}).call(this);

(function() {
  (function(Backbone, model) {
    'use strict';
    return model.User = Backbone.Model.extend({
      urlRoot: "/api/users/",
      say: function() {
        return "I am " + (this.get("name"));
      }
    });
  }).call(this, myapp.Backbone, myapp.model);

}).call(this);

(function() {
  (function(Backbone, model, collection) {
    'use strict';
    return collection.Users = Backbone.Collection.extend({
      url: '/api/users/',
      model: model.User
    });
  }).call(this, myapp.Backbone, myapp.model, myapp.collection);

}).call(this);

(function() {
  (function(Backbone, view, JST) {
    'use strict';
    return view.MyApp = Backbone.View.extend({
      render: function(data) {
        return this.$el.html(this.tmpl(data));
      }
    }, {
      JST: function(template) {
        return JST[template];
      }
    });
  }).call(this, myapp.Backbone, myapp.view, myapp.JST);

}).call(this);

(function() {
  (function(view) {
    'use strict';
    return view.MainView = view.MyApp.extend({
      el: $('#mainview')
    });
  }).call(this, myapp.view);

}).call(this);

(function() {
  (function(view) {
    'use strict';
    return view.SubView = view.MyApp.extend({
      el: $('#subview')
    });
  }).call(this, myapp.view);

}).call(this);

(function() {
  (function(MainView, main) {
    'use strict';
    return main.Default = MainView.extend({
      tmpl: MainView.JST('main/default'),
      show: function(user) {
        return this.render(user);
      }
    });
  }).call(this, myapp.view.MainView, myapp.view.main);

}).call(this);

(function() {
  (function(MainView, main) {
    'use strict';
    return main.Top = MainView.extend({
      tmpl: MainView.JST('main/top')
    });
  }).call(this, myapp.view.MainView, myapp.view.main);

}).call(this);

(function() {
  (function(SubView, sub) {
    'use strict';
    return sub.Friends = SubView.extend({
      tmpl: SubView.JST('sub/friends'),
      show: function(users) {
        console.log(users);
        return this.render({
          friends: users
        });
      }
    });
  }).call(this, myapp.view.SubView, myapp.view.sub);

}).call(this);

(function() {
  (function(SubView, sub) {
    'use strict';
    return sub.My = SubView.extend({
      tmpl: SubView.JST('sub/my'),
      show: function(user) {
        return this.render(user);
      }
    });
  }).call(this, myapp.view.SubView, myapp.view.sub);

}).call(this);

(function() {
  (function(SubView, sub) {
    'use strict';
    return sub.Top = SubView.extend({
      tmpl: SubView.JST('sub/top')
    });
  }).call(this, myapp.view.SubView, myapp.view.sub);

}).call(this);

(function() {
  (function(Backbone, model, view, collection) {
    'use strict';
    var Router;
    Router = Backbone.Router.extend({
      routes: {
        "": "top",
        "my/": "my",
        "friends/": "friends"
      },
      top: function() {
        new view.sub.Top().render();
        return new view.main.Top().render();
      },
      my: function() {
        var my;
        my = new model.User({
          id: 1
        });
        return my.fetch({
          success: function() {
            var data;
            data = my.toJSON();
            new view.main.Default().show(data);
            return new view.sub.My().show(data);
          }
        });
      },
      friends: function() {
        var users;
        users = new collection.Users();
        return users.fetch({
          success: function() {
            var my;
            new view.sub.Friends().show(users.toJSON());
            my = new model.User({
              id: 1
            });
            return my.fetch({
              success: function() {
                return new view.main.Default().show(my.toJSON());
              }
            });
          }
        });
      }
    });
    myapp.Router = new Router();
    return Backbone.history.start();
  }).call(this, myapp.Backbone, myapp.model, myapp.view, myapp.collection);

}).call(this);
