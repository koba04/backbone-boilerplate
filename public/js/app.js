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
    myapp.view = {};
    return myapp.util = {};
  })();

}).call(this);

(function() {
  (function() {
    'use strict';
    var Storage;
    Storage = (function() {
      function Storage(storage) {
        this.storage = storage;
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
    this.util.sessionStorage = new Storage(sessionStorage);
    return this.util.localStorage = new Storage(localStorage);
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
  (function() {
    'use strict';
    var collection, model, view;
    view = this.view;
    model = this.model;
    collection = this.collection;
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
        return new view.Top().render();
      },
      my: function() {
        var my;
        my = new model.User({
          id: 1
        });
        return my.fetch({
          success: function() {
            return new view.My().show(my);
          }
        });
      },
      friends: function() {
        var users;
        users = new collection.Users();
        return users.fetch({
          success: function() {
            return new view.Friends().show(users);
          }
        });
      }
    });
  }).call(myapp);

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
    var ModelStorage, app, model, util;
    app = this.app;
    model = this.model;
    util = this.util;
    model.Base = Backbone.Model.extend({
      storage: null,
      sync: app.sync,
      setStorage: function(key) {
        return this.storage = new ModelStorage(key);
      }
    });
    return ModelStorage = (function() {
      function ModelStorage(key, storageType) {
        this.key = key;
        if (storageType == null) {
          storageType = "session";
        }
        this.storage = storageType === "local" ? util.localStorage : util.sessionStorage;
      }

      ModelStorage.prototype.get = function() {
        var data;
        data = this.storage.get(this.key);
        if (data == null) {
          return;
        }
        return JSON.parse(data);
      };

      ModelStorage.prototype.set = function(data, method) {
        return this.storage.set(this.key, JSON.stringify(data));
      };

      ModelStorage.prototype.remove = function() {
        return this.storage.remove(this.key);
      };

      return ModelStorage;

    })();
  }).call(myapp);

}).call(this);

(function() {
  (function() {
    'use strict';
    var model;
    model = this.model;
    return model.User = model.Base.extend({
      urlRoot: "/users/",
      initialize: function(attrs) {
        this.setStorage("model:user:" + attrs.id);
        return this.name = attrs.name;
      }
    });
  }).call(myapp);

}).call(this);

(function() {
  (function() {
    'use strict';
    var CollectionStorage, app, collection, model, util;
    app = this.app;
    model = this.model;
    collection = this.collection;
    util = this.util;
    collection.Base = Backbone.Collection.extend({
      storage: null,
      sync: app.sync,
      model: model.Base,
      setStorage: function(key) {
        return this.storage = new CollectionStorage(key, this.model);
      }
    });
    return CollectionStorage = (function() {
      function CollectionStorage(key, model, storageType) {
        this.key = key;
        this.model = model;
        if (storageType == null) {
          storageType = "session";
        }
        this.storage = storageType === "local" ? util.localStorage : util.sessionStorage;
      }

      CollectionStorage.prototype.get = function() {
        var data, datas, id, idAttribute, ids, opt, _i, _len;
        ids = this.storage.get(this.key);
        if (ids == null) {
          return;
        }
        datas = [];
        ids = JSON.parse(ids);
        idAttribute = this._getModelIdAttribute();
        opt = {};
        for (_i = 0, _len = ids.length; _i < _len; _i++) {
          id = ids[_i];
          opt[idAttribute] = id;
          data = new this.model(opt).storage.get();
          if (data == null) {
            return;
          }
          datas.push(data);
        }
        return datas;
      };

      CollectionStorage.prototype.set = function(datas, method) {
        var data, id, idAttribute, ids, opt, _i, _len;
        ids = [];
        idAttribute = this._getModelIdAttribute();
        opt = {};
        for (_i = 0, _len = datas.length; _i < _len; _i++) {
          data = datas[_i];
          id = data[idAttribute];
          ids.push(id);
          opt[idAttribute] = id;
          new this.model(opt).storage.set(data, method);
        }
        return this.storage.set(this.key, JSON.stringify(ids));
      };

      CollectionStorage.prototype.remove = function() {
        var id, ids, _i, _len, _results;
        ids = this.storage.get(this.key);
        this.storage.remove(this.key);
        _results = [];
        for (_i = 0, _len = ids.length; _i < _len; _i++) {
          id = ids[_i];
          _results.push(new this.model({
            id: id
          }).storage.remove());
        }
        return _results;
      };

      CollectionStorage.prototype._getModelIdAttribute = function() {
        if (this.model.prototype.idAttribute != null) {
          return this.model.prototype.idAttribute;
        } else {
          return "id";
        }
      };

      return CollectionStorage;

    })();
  }).call(myapp);

}).call(this);

(function() {
  (function() {
    'use strict';
    var collection, model;
    model = this.model;
    collection = this.collection;
    return collection.Users = collection.Base.extend({
      url: "/users/",
      model: model.User,
      initialize: function(attrs) {
        return this.setStorage("collection:users", this.model);
      }
    });
  }).call(myapp);

}).call(this);

(function() {
  (function() {
    'use strict';
    var view;
    view = this.view;
    return view.Base = Backbone.View.extend({
      el: $('#content'),
      render: function(data) {
        return this.$el.html(this.tmpl(data));
      }
    });
  }).call(myapp);

}).call(this);

(function() {
  (function() {
    'use strict';
    var app, view;
    app = this.app;
    view = this.view;
    return view.Friends = view.Base.extend({
      tmpl: app.template.get('friends'),
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
    var app, view;
    app = this.app;
    view = this.view;
    return view.My = view.Base.extend({
      tmpl: app.template.get('my'),
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
    var app, view;
    app = this.app;
    view = this.view;
    return view.Top = view.Base.extend({
      tmpl: app.template.get('top')
    });
  }).call(myapp);

}).call(this);

(function() {
  (function() {
    'use strict';
    return myapp.app.start();
  })();

}).call(this);
