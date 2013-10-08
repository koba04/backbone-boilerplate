(function() {
  (function() {
    'use strict';
    var MyApp;
    MyApp = window.MyApp;
    MyApp.Model = {};
    MyApp.Collection = {};
    MyApp.View = {
      Main: {},
      Sub: {}
    };
    return MyApp.Util = {};
  })();

}).call(this);

(function() {
  (function() {
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
    return MyApp.Util.Http = new Http();
  })();

}).call(this);

(function() {
  (function() {
    'use strict';
    return MyApp.Model.User = Backbone.Model.extend({
      urlRoot: "/api/users/",
      say: function() {
        return "I am " + (this.get("name"));
      }
    });
  })();

}).call(this);

(function() {
  (function() {
    'use strict';
    return MyApp.Collection.Users = Backbone.Collection.extend({
      url: '/api/users/',
      model: MyApp.Model.User
    });
  })();

}).call(this);

(function() {
  (function() {
    'use strict';
    return MyApp.View.MainView = Backbone.View.extend({
      el: $('#mainview'),
      render: function(data) {
        return this.$el.html(this.tmpl(data));
      }
    });
  })();

}).call(this);

(function() {
  (function() {
    'use strict';
    return MyApp.View.SubView = Backbone.View.extend({
      el: $('#subview'),
      render: function(data) {
        return this.$el.html(this.tmpl(data));
      }
    });
  })();

}).call(this);

(function() {
  (function() {
    'use strict';
    return MyApp.View.Main.Default = MyApp.View.MainView.extend({
      tmpl: MyApp.JST['main/default'],
      show: function(user) {
        return this.render(user);
      }
    });
  })();

}).call(this);

(function() {
  (function() {
    'use strict';
    return MyApp.View.Main.Top = MyApp.View.MainView.extend({
      tmpl: MyApp.JST['main/top']
    });
  })();

}).call(this);

(function() {
  (function() {
    'use strict';
    return MyApp.View.Sub.Friends = MyApp.View.SubView.extend({
      tmpl: MyApp.JST['sub/friends'],
      show: function(users) {
        console.log(users);
        return this.render({
          friends: users
        });
      }
    });
  })();

}).call(this);

(function() {
  (function() {
    'use strict';
    return MyApp.View.Sub.My = MyApp.View.SubView.extend({
      tmpl: MyApp.JST['sub/my'],
      show: function(user) {
        return this.render(user);
      }
    });
  })();

}).call(this);

(function() {
  (function() {
    'use strict';
    return MyApp.View.Sub.Top = MyApp.View.SubView.extend({
      tmpl: MyApp.JST['sub/top']
    });
  })();

}).call(this);

(function() {
  (function() {
    'use strict';
    var Router;
    Router = Backbone.Router.extend({
      routes: {
        "": "top",
        "my/": "my",
        "friends/": "friends"
      },
      top: function() {
        new MyApp.View.Sub.Top().render();
        return new MyApp.View.Main.Top().render();
      },
      my: function() {
        var my;
        my = new MyApp.Model.User({
          id: 1
        });
        return my.fetch({
          success: function() {
            var data;
            data = my.toJSON();
            new MyApp.View.Main.Default().show(data);
            return new MyApp.View.Sub.My().show(data);
          }
        });
      },
      friends: function() {
        var users;
        users = new MyApp.Collection.Users();
        return users.fetch({
          success: function() {
            var my;
            new MyApp.View.Sub.Friends().show(users.toJSON());
            my = new MyApp.Model.User({
              id: 1
            });
            return my.fetch({
              success: function() {
                return new MyApp.View.Main.Default().show(my.toJSON());
              }
            });
          }
        });
      }
    });
    MyApp.Router = new Router();
    return Backbone.history.start();
  })();

}).call(this);
