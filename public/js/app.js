(function() {
  (function() {
    'use strict';
    var myapp;
    if (window.myapp == null) {
      window.myapp = {};
    }
    myapp = window.myapp;
    myapp.model = {};
    myapp.collection = {};
    myapp.view = {
      main: {},
      sub: {}
    };
    return myapp.util = {};
  })();

}).call(this);

(function() {
  (function() {
    'use strict';
    var storage;
    storage = sessionStorage;
    return myapp.util.Storage = {
      get: function(key) {
        return storage.getItem(key);
      },
      set: function(key, data) {
        return storage.setItem(key, data);
      },
      remove: function(key) {
        return storage.removeItem(key);
      },
      clear: function() {
        return storage.clear();
      }
    };
  })();

}).call(this);

(function() {
  (function() {
    'use strict';
    return myapp.Template = (function() {
      function Template() {
        var fn, name, particle, _i, _len, _ref, _ref1;
        _ref = this.helper;
        for (name in _ref) {
          fn = _ref[name];
          Handlebars.registerHelper(name, fn);
        }
        _ref1 = this.particles;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          particle = _ref1[_i];
          Handlebars.registerPartial(particle, myapp.JST["particle/" + particle]);
        }
      }

      Template.prototype.get = function(name) {
        return myapp.JST[name];
      };

      Template.prototype.helper = {
        upperCase: function(str) {
          return str.toUpperCase();
        }
      };

      Template.prototype.particles = ['user'];

      return Template;

    })();
  })();

}).call(this);

(function() {
  (function(model, view, collection) {
    'use strict';
    return myapp.Router = Backbone.Router.extend({
      routes: {
        "": "top",
        "my/": "my",
        "friends/": "friends"
      },
      start: function() {
        return Backbone.history.start();
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
            new view.main.Default().show(my);
            return new view.sub.My().show(my);
          }
        });
      },
      friends: function() {
        var users;
        users = new collection.Users();
        return users.fetch({
          success: function() {
            var my;
            new view.sub.Friends().show(users);
            my = new model.User({
              id: 1
            });
            return my.fetch({
              success: function() {
                return new view.main.Default().show(my);
              }
            });
          }
        });
      }
    });
  }).call(this, myapp.model, myapp.view, myapp.collection);

}).call(this);

(function() {
  (function() {
    'use strict';
    var App;
    App = (function() {
      function App() {
        this.template = new myapp.Template();
        this.router = new myapp.Router();
      }

      App.prototype.setupAjax = function() {
        $.ajaxSettings.timeout = 5000;
        $.ajaxSettings.cache = false;
        return $.ajaxSettings.xhr = function() {
          var xhr;
          xhr = new XMLHttpRequest();
          return xhr;
        };
      };

      App.prototype.start = function() {
        myapp.util.Storage.clear();
        this.setupAjax();
        return this.router.start();
      };

      App.prototype.sync = function(method, model, options) {
        var cache, successCallback, sync;
        options.error = function() {
          return window.location = "#/error/";
        };
        sync = function(success) {
          if (success != null) {
            options.success = success;
          }
          return Backbone.sync(method, model, options);
        };
        if (model.storage == null) {
          return sync();
        }
        successCallback = options.success;
        if (method === "delete") {
          return sync(function(data) {
            model.storage.remove();
            return successCallback(data);
          });
        }
        if (method === "read") {
          cache = model.storage.get();
          if (cache != null) {
            return successCallback(cache);
          }
        }
        return sync(function(data) {
          model.set(data);
          model.storage.set(data, method);
          return successCallback(data);
        });
      };

      return App;

    })();
    return myapp.app = new App();
  })();

}).call(this);

(function() {
  (function(model, util) {
    'use strict';
    var Storage;
    model.Base = Backbone.Model.extend({
      storage: null,
      sync: myapp.app.sync,
      createStorage: function(key) {
        return this.storage = new Storage(key);
      }
    });
    return Storage = (function() {
      function Storage(key) {
        this.key = key;
      }

      Storage.prototype.get = function() {
        var data;
        data = util.Storage.get(this.key);
        if (data == null) {
          return;
        }
        return JSON.parse(data);
      };

      Storage.prototype.set = function(data, method) {
        return util.Storage.set(this.key, JSON.stringify(data));
      };

      Storage.prototype.remove = function() {
        return util.Storage.remove(this.key);
      };

      return Storage;

    })();
  }).call(this, myapp.model, myapp.util);

}).call(this);

(function() {
  (function(model) {
    'use strict';
    return model.User = model.Base.extend({
      urlRoot: "/users/",
      initialize: function(attrs) {
        this.createStorage("model:user:" + attrs.id);
        return this.name = attrs.name;
      }
    });
  }).call(this, myapp.model);

}).call(this);

(function() {
  (function(model, collection, util) {
    'use strict';
    var Storage;
    collection.Base = Backbone.Collection.extend({
      storage: null,
      sync: myapp.app.sync,
      model: model.Base,
      createStorage: function(key) {
        return this.storage = new Storage(key, this.model);
      }
    });
    return Storage = (function() {
      function Storage(key, model) {
        this.key = key;
        this.model = model;
      }

      Storage.prototype.get = function() {
        var data, datas, id, ids, _i, _len;
        ids = util.Storage.get(this.key);
        if (ids == null) {
          return;
        }
        datas = [];
        ids = JSON.parse(ids);
        for (_i = 0, _len = ids.length; _i < _len; _i++) {
          id = ids[_i];
          model = new this.model({
            id: id
          });
          data = model.storage.get();
          if (data == null) {
            return;
          }
          datas.push(data);
        }
        return datas;
      };

      Storage.prototype.set = function(datas, method) {
        var data, ids, _i, _len;
        ids = [];
        for (_i = 0, _len = datas.length; _i < _len; _i++) {
          data = datas[_i];
          ids.push(data.id);
          model = new this.model({
            id: data.id
          });
          model.storage.set(data, method);
        }
        return util.Storage.set(this.key, JSON.stringify(ids));
      };

      Storage.prototype.remove = function() {
        var id, ids, _i, _len, _results;
        ids = util.Storage.get(this.key);
        util.Storage.remove(this.key);
        _results = [];
        for (_i = 0, _len = ids.length; _i < _len; _i++) {
          id = ids[_i];
          model = new this.model({
            id: id
          });
          _results.push(model.storage.remove());
        }
        return _results;
      };

      return Storage;

    })();
  }).call(this, myapp.model, myapp.collection, myapp.util);

}).call(this);

(function() {
  (function(model, collection) {
    'use strict';
    return collection.Users = collection.Base.extend({
      url: "/users/",
      model: model.User,
      initialize: function(attrs) {
        return this.createStorage("collection:users", this.model);
      }
    });
  }).call(this, myapp.model, myapp.collection);

}).call(this);

(function() {
  (function(view) {
    'use strict';
    return view.Base = Backbone.View.extend({
      render: function(data) {
        return this.$el.html(this.tmpl(data));
      }
    });
  }).call(this, myapp.view);

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
  (function(MainView, main, app) {
    'use strict';
    return main.Default = MainView.extend({
      tmpl: app.template.get('main/default'),
      show: function(user) {
        return this.render({
          user: user.toJSON()
        });
      }
    });
  }).call(this, myapp.view.MainView, myapp.view.main, myapp.app);

}).call(this);

(function() {
  (function(MainView, main, app) {
    'use strict';
    return main.Top = MainView.extend({
      tmpl: app.template.get('main/top')
    });
  }).call(this, myapp.view.MainView, myapp.view.main, myapp.app);

}).call(this);

(function() {
  (function(SubView, sub, app) {
    'use strict';
    return sub.Friends = SubView.extend({
      tmpl: app.template.get('sub/friends'),
      show: function(users) {
        return this.render({
          friends: users.toJSON()
        });
      }
    });
  }).call(this, myapp.view.SubView, myapp.view.sub, myapp.app);

}).call(this);

(function() {
  (function(SubView, sub, app) {
    'use strict';
    return sub.My = SubView.extend({
      tmpl: app.template.get('sub/my'),
      show: function(user) {
        return this.render({
          user: user.toJSON()
        });
      }
    });
  }).call(this, myapp.view.SubView, myapp.view.sub, myapp.app);

}).call(this);

(function() {
  (function(SubView, sub, app) {
    'use strict';
    return sub.Top = SubView.extend({
      tmpl: app.template.get('sub/top')
    });
  }).call(this, myapp.view.SubView, myapp.view.sub, myapp.app);

}).call(this);

(function() {
  (function() {
    'use strict';
    return myapp.app.start();
  })();

}).call(this);
