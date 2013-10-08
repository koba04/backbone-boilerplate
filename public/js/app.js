(function() {
  (function() {
    'use strict';
    var myapp, originalSync;
    myapp = window.myapp;
    myapp.model = {};
    myapp.collection = {};
    myapp.view = {
      main: {},
      sub: {}
    };
    myapp.util = {};
    originalSync = Backbone.sync;
    return Backbone.sync = function(method, model, options) {
      var cache, successCallback, sync;
      options.error = function() {
        return window.location = "#/error/";
      };
      sync = function() {
        return originalSync(method, model, options);
      };
      if (!model.isSaveStorage) {
        return sync();
      }
      successCallback = options.success;
      if (method === "delete") {
        options.success = function(data) {
          model.removeStorage();
          return successCallback(data);
        };
        return sync();
      }
      if (method === "read") {
        cache = model.getStorage();
        if (cache != null) {
          return successCallback(cache);
        }
      }
      options.success = function(data) {
        model.saveStorage(method, data);
        return successCallback(data);
      };
      return sync();
    };
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
  (function() {
    'use strict';
    var Storage, global;
    global = this;
    Storage = (function() {
      function Storage() {
        this.storage = sessionStorage;
      }

      Storage.prototype.get = function(key) {
        return this.storage.getItem(key);
      };

      Storage.prototype.set = function(key, data) {
        return this.storage.setItem(key, data);
      };

      Storage.prototype.remove = function(key) {
        return this.storage.removeItem(key);
      };

      Storage.prototype.clear = function() {
        return this.storage.clear();
      };

      return Storage;

    })();
    return myapp.util.Storage = new Storage();
  })();

}).call(this);

(function() {
  (function(model, util) {
    'use strict';
    return model.Base = Backbone.Model.extend({
      isSaveStorage: false,
      storageKey: "",
      getStorage: function() {
        var data;
        data = util.Storage.get(this.storageKey);
        if (data == null) {
          return;
        }
        return JSON.parse(data);
      },
      saveStorage: function(method, data) {
        return util.Storage.set(this.storageKey, JSON.stringify(data));
      },
      removeStorage: function() {
        return util.Storage.remove(this.storageKey);
      }
    });
  }).call(this, myapp.model, myapp.util);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  (function(model) {
    'use strict';
    var _ref;
    return model.User = (function(_super) {
      __extends(User, _super);

      function User() {
        _ref = User.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      User.prototype.isSaveStorage = true;

      User.prototype.urlRoot = "/api/users/";

      User.prototype.initialize = function(attrs) {
        return this.storageKey = "model:user:" + attrs.id;
      };

      return User;

    })(model.Base);
  }).call(this, myapp.model);

}).call(this);

(function() {
  (function(model, collection, util) {
    'use strict';
    return collection.Base = Backbone.Collection.extend({
      isSaveStorage: false,
      storageKey: "",
      model: model.Base,
      getStorage: function() {
        var data, datas, id, ids, _i, _len;
        ids = util.Storage.get(this.storageKey);
        if (ids == null) {
          return;
        }
        datas = [];
        for (_i = 0, _len = ids.length; _i < _len; _i++) {
          id = ids[_i];
          model = new this.model({
            id: id
          });
          data = util.Storage.get(model.storageKey);
          if (data == null) {
            return;
          }
          datas.push(data);
        }
        return datas;
      },
      saveStorage: function(method, datas) {
        var data, ids, _i, _len;
        ids = [];
        for (_i = 0, _len = datas.length; _i < _len; _i++) {
          data = datas[_i];
          ids.push(data.id);
          model = new this.model({
            id: data.id
          });
          util.Storage.set(model.storageKey, JSON.stringify(data));
        }
        return util.Storage.set(this.storageKey, JSON.stringify(ids));
      },
      removeStorage: function() {
        var id, ids, _i, _len, _results;
        ids = util.Storage.get(this.storageKey);
        util.Storage.remove(this.storageKey);
        _results = [];
        for (_i = 0, _len = ids.length; _i < _len; _i++) {
          id = ids[_i];
          model = new this.model({
            id: id
          });
          _results.push(util.Storage.remove(model.storageKey));
        }
        return _results;
      }
    });
  }).call(this, myapp.model, myapp.collection, myapp.util);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  (function(model, collection) {
    'use strict';
    var _ref;
    return collection.Users = (function(_super) {
      __extends(Users, _super);

      function Users() {
        _ref = Users.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Users.prototype.isSaveStorage = true;

      Users.prototype.url = '/api/users/';

      Users.prototype.model = model.User;

      Users.prototype.storageKey = "collection:users";

      return Users;

    })(collection.Base);
  }).call(this, myapp.model, myapp.collection);

}).call(this);

(function() {
  (function(view, JST) {
    'use strict';
    return view.Base = Backbone.View.extend({
      render: function(data) {
        return this.$el.html(this.tmpl(data));
      }
    }, {
      JST: function(template) {
        return JST[template];
      }
    });
  }).call(this, myapp.view, myapp.JST);

}).call(this);

(function() {
  (function(view) {
    'use strict';
    return view.MainView = view.Base.extend({
      el: $('#mainview')
    });
  }).call(this, myapp.view);

}).call(this);

(function() {
  (function(view) {
    'use strict';
    return view.SubView = view.Base.extend({
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
  (function(model, view, collection) {
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
  }).call(this, myapp.model, myapp.view, myapp.collection);

}).call(this);
