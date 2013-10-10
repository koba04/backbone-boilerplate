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
    return this.util.Storage = {
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
  }).call(myapp);

}).call(this);

(function() {
  (function() {
    'use strict';
    var JST, Template;
    JST = this.JST;
    Template = (function() {
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
          Handlebars.registerPartial(particle, JST["particle/" + particle]);
        }
      }

      Template.prototype.get = function(name) {
        return JST[name];
      };

      Template.prototype.helper = {
        upperCase: function(str) {
          return str.toUpperCase();
        }
      };

      Template.prototype.particles = ['user'];

      return Template;

    })();
    return this.Template = Template;
  }).call(myapp);

}).call(this);

(function() {
  (function(Backbone) {
    'use strict';
    var c, m, v;
    v = this.view;
    m = this.model;
    c = this.collection;
    return this.Router = Backbone.Router.extend({
      routes: {
        "": "top",
        "my/": "my",
        "friends/": "friends"
      },
      start: function() {
        return Backbone.history.start();
      },
      top: function() {
        new v.sub.Top().render();
        return new v.main.Top().render();
      },
      my: function() {
        var my;
        my = new m.User({
          id: 1
        });
        return my.fetch({
          success: function() {
            new v.main.Default().show(my);
            return new v.sub.My().show(my);
          }
        });
      },
      friends: function() {
        var users;
        users = new c.Users();
        return users.fetch({
          success: function() {
            var my;
            new v.sub.Friends().show(users);
            my = new m.User({
              id: 1
            });
            return my.fetch({
              success: function() {
                return new v.main.Default().show(my);
              }
            });
          }
        });
      }
    });
  }).call(myapp, Backbone);

}).call(this);

(function() {
  (function() {
    'use strict';
    var App, Storage, myapp;
    myapp = this;
    Storage = this.util.Storage;
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
          xhr = new XMLHttpRequest;
          return xhr;
        };
      };

      App.prototype.start = function() {
        Storage.clear();
        this.setupAjax();
        return this.router.start();
      };

      App.prototype.sync = function(method, model, options) {
        var cache, successCallback, sync;
        if (this instanceof App) {
          throw new Error("sync method is for override model or collection's sync()");
        }
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
  }).call(myapp);

}).call(this);

(function() {
  (function() {
    'use strict';
    var ModelStorage, Storage, a, m;
    a = this.app;
    m = this.model;
    Storage = this.util.Storage;
    m.Base = Backbone.Model.extend({
      storage: null,
      sync: a.sync,
      createStorage: function(key) {
        return this.storage = new ModelStorage(key);
      }
    });
    return ModelStorage = (function() {
      function ModelStorage(key) {
        this.key = key;
      }

      ModelStorage.prototype.get = function() {
        var data;
        data = Storage.get(this.key);
        if (data == null) {
          return;
        }
        return JSON.parse(data);
      };

      ModelStorage.prototype.set = function(data, method) {
        return Storage.set(this.key, JSON.stringify(data));
      };

      ModelStorage.prototype.remove = function() {
        return Storage.remove(this.key);
      };

      return ModelStorage;

    })();
  }).call(myapp);

}).call(this);

(function() {
  (function() {
    'use strict';
    var m;
    m = this.model;
    return m.User = m.Base.extend({
      urlRoot: "/users/",
      initialize: function(attrs) {
        this.createStorage("model:user:" + attrs.id);
        return this.name = attrs.name;
      }
    });
  }).call(myapp);

}).call(this);

(function() {
  (function() {
    'use strict';
    var CollectionStorage, Storage, a, c, m, v;
    a = this.app;
    m = this.model;
    c = this.collection;
    v = this.view;
    Storage = this.util.Storage;
    c.Base = Backbone.Collection.extend({
      storage: null,
      sync: a.sync,
      model: m.Base,
      createStorage: function(key) {
        return this.storage = new CollectionStorage(key, this.model);
      }
    });
    return CollectionStorage = (function() {
      function CollectionStorage(key, model) {
        this.key = key;
        this.model = model;
      }

      CollectionStorage.prototype.get = function() {
        var data, datas, id, ids, model, _i, _len;
        ids = Storage.get(this.key);
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

      CollectionStorage.prototype.set = function(datas, method) {
        var data, ids, model, _i, _len;
        ids = [];
        for (_i = 0, _len = datas.length; _i < _len; _i++) {
          data = datas[_i];
          ids.push(data.id);
          model = new this.model({
            id: data.id
          });
          model.storage.set(data, method);
        }
        return Storage.set(this.key, JSON.stringify(ids));
      };

      CollectionStorage.prototype.remove = function() {
        var id, ids, model, _i, _len, _results;
        ids = Storage.get(this.key);
        Storage.remove(this.key);
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

      return CollectionStorage;

    })();
  }).call(myapp);

}).call(this);

(function() {
  (function() {
    'use strict';
    var c, m;
    m = this.model;
    c = this.collection;
    return c.Users = c.Base.extend({
      url: "/users/",
      model: m.User,
      initialize: function(attrs) {
        return this.createStorage("collection:users", this.model);
      }
    });
  }).call(myapp);

}).call(this);

(function() {
  (function() {
    'use strict';
    var v;
    v = this.view;
    return v.Base = Backbone.View.extend({
      render: function(data) {
        return this.$el.html(this.tmpl(data));
      }
    });
  }).call(myapp);

}).call(this);

(function() {
  (function() {
    'use strict';
    var v;
    v = this.view;
    return v.MainView = v.Base.extend({
      el: $('#mainview')
    });
  }).call(myapp);

}).call(this);

(function() {
  (function() {
    'use strict';
    var v;
    v = this.view;
    return v.SubView = v.Base.extend({
      el: $('#subview')
    });
  }).call(myapp);

}).call(this);

(function() {
  (function() {
    'use strict';
    var a, v;
    a = this.app;
    v = this.view;
    return v.main.Default = v.MainView.extend({
      tmpl: a.template.get('main/default'),
      show: function(user) {
        return this.render({
          user: user.toJSON()
        });
      }
    });
  }).call(myapp);

}).call(this);

(function() {
  (function() {
    'use strict';
    var a, v;
    a = this.app;
    v = this.view;
    return v.main.Top = v.MainView.extend({
      tmpl: a.template.get('main/top')
    });
  }).call(myapp);

}).call(this);

(function() {
  (function() {
    'use strict';
    var a, v;
    a = this.app;
    v = this.view;
    return v.sub.Friends = v.SubView.extend({
      tmpl: a.template.get('sub/friends'),
      show: function(users) {
        return this.render({
          friends: users.toJSON()
        });
      }
    });
  }).call(myapp);

}).call(this);

(function() {
  (function() {
    'use strict';
    var a, v;
    a = this.app;
    v = this.view;
    return v.sub.My = v.SubView.extend({
      tmpl: a.template.get('sub/my'),
      show: function(user) {
        return this.render({
          user: user.toJSON()
        });
      }
    });
  }).call(myapp);

}).call(this);

(function() {
  (function() {
    'use strict';
    var a, v;
    a = this.app;
    v = this.view;
    return v.sub.Top = v.SubView.extend({
      tmpl: a.template.get('sub/top')
    });
  }).call(myapp);

}).call(this);

(function() {
  (function() {
    'use strict';
    return myapp.app.start();
  })();

}).call(this);
