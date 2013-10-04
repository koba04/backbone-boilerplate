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

      Http.prototype.get = function(url, params, success, fail) {
        return this._ajax('get', url, params, success, fail);
      };

      Http.prototype.post = function(url, params, success, fail) {
        return this._ajax('post', url, params, success, fail);
      };

      Http.prototype.put = function(url, params, success, fail) {
        return this._ajax('put', url, params, success, fail);
      };

      Http.prototype["delete"] = function(url, params, suceess, fail) {
        return this._ajax('delete', url, params, success, fail);
      };

      Http.prototype._ajax = function(method, url, params, success, fail) {
        return $.ajax({
          url: url,
          type: method,
          data: params,
          dataType: 'json',
          success: function(data) {
            return success(data);
          },
          error: function(xhr, type) {
            if (fail != null) {
              return fail(xhr, type);
            } else {

            }
          }
        });
      };

      return Http;

    })();
    return MyApp.Util.Http = new Http();
  })();

}).call(this);

(function() {
  (function() {
    'use strict';
    return MyApp.View.MainView = Backbone.View.extend({
      el: $('#mainview')
    });
  })();

}).call(this);

(function() {
  (function() {
    'use strict';
    return MyApp.View.SubView = Backbone.View.extend({
      el: $('#subview')
    });
  })();

}).call(this);

(function() {
  (function() {
    'use strict';
    return MyApp.View.Main.Default = MyApp.View.MainView.extend({
      tmpl: MyApp.JST['main/default'],
      render: function() {
        return this.$el.html(this.tmpl());
      }
    });
  })();

}).call(this);

(function() {
  (function() {
    'use strict';
    return MyApp.View.Main.Top = MyApp.View.MainView.extend({
      tmpl: MyApp.JST['main/top'],
      render: function() {
        return this.$el.html(this.tmpl());
      }
    });
  })();

}).call(this);

(function() {
  (function() {
    'use strict';
    return MyApp.View.Sub.My = MyApp.View.SubView.extend({
      tmpl: MyApp.JST['sub/my'],
      render: function() {
        MyApp.Util.Http.get("/public", {
          page: 2
        }, function(data) {
          return console.dir(data);
        });
        return this.$el.html(this.tmpl());
      }
    });
  })();

}).call(this);

(function() {
  (function() {
    'use strict';
    return MyApp.View.Sub.Top = MyApp.View.SubView.extend({
      tmpl: MyApp.JST['sub/top'],
      render: function() {
        return this.$el.html(this.tmpl());
      }
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
        "my/": "my"
      },
      top: function() {
        new MyApp.View.Sub.Top().render();
        return new MyApp.View.Main.Top().render();
      },
      my: function() {
        new MyApp.View.Main.Default().render();
        return new MyApp.View.Sub.My().render();
      }
    });
    MyApp.Router = new Router();
    return Backbone.history.start();
  })();

}).call(this);
