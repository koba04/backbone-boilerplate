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
    return this.util.cachedSync = function(method, model, options) {
      var data;
      if (method === "read" && (model.storage != null)) {
        data = model.storage.get();
        if (data != null) {
          return options.success(data);
        }
      }
      return Backbone.sync(method, model, options);
    };
  }).call(myapp);

}).call(this);

(function() {
  (function() {
    'use strict';
    var Storage;
    Storage = (function() {
      function Storage(type) {
        this.type = type;
        this.storage = this.type === "local" ? localStorage : sessionStorage;
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
    this.util.sessionStorage = new Storage('session');
    return this.util.localStorage = new Storage('local');
  }).call(myapp);

}).call(this);

(function() {
  (function() {
    'use strict';
    var Template;
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
    return this.Controller = {
      top: function() {
        return new view.Top().render();
      },
      error: function() {
        return new view.Error().render();
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
    };
  }).call(myapp);

}).call(this);

(function() {
  (function() {
    'use strict';
    return this.Router = Backbone.Marionette.AppRouter.extend({
      controller: myapp.Controller,
      appRoutes: {
        "": "top",
        "error/": "error",
        "my/": "my",
        "friends/": "friends"
      },
      assign: function(path) {
        return Backbone.history.navigate("#" + path, {
          replace: false
        });
      },
      replace: function(path) {
        return Backbone.history.navigate("#" + path, {
          replace: true
        });
      }
    });
  }).call(myapp);

}).call(this);

(function() {
  (function() {
    'use strict';
    var App, myapp, setupAjax;
    myapp = this;
    setupAjax = function() {
      $.ajaxSettings.timeout = 5000;
      return $.ajaxSettings.cache = false;
    };
    App = new Backbone.Marionette.Application();
    App.addInitializer(function() {
      this.router = new myapp.Router();
      return setupAjax();
    });
    return myapp.App = App;
  }).call(myapp);

}).call(this);

(function() {
  (function() {
    'use strict';
    var ModelStorage, model, util;
    model = this.model;
    util = this.util;
    model.Base = Backbone.Model.extend({
      storage: null,
      sync: util.cachedSync,
      initialize: function(attrs) {
        var id, idAttribute,
          _this = this;
        if (attrs == null) {
          attrs = {};
        }
        if (this.storageType != null) {
          idAttribute = this.idAttribute != null ? this.idAttribute : "id";
          id = attrs[idAttribute] || "";
          this.storage = new ModelStorage("model:" + this.constructor.name + ":" + id, this.storageType);
          this.on("change", function() {
            return _this.storage.set(_this.toJSON());
          });
          return this.on("destroy", function() {
            return _this.storage.remove();
          });
        }
      }
    });
    return ModelStorage = (function() {
      function ModelStorage(key, storageType) {
        this.key = key;
        switch (storageType) {
          case "session":
            this.storage = util.sessionStorage;
            break;
          case "local":
            this.storage = util.localStorage;
            break;
          default:
            throw new Error("storageType is allowed 'session' or 'local'");
        }
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
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  (function() {
    'use strict';
    var model, _ref;
    model = this.model;
    return model.User = (function(_super) {
      __extends(User, _super);

      function User() {
        _ref = User.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      User.prototype.urlRoot = "/users/";

      User.prototype.storageType = "session";

      User.prototype.initialize = function(attrs) {
        User.__super__.initialize.apply(this, arguments);
        return this.name = attrs.name;
      };

      return User;

    })(model.Base);
  }).call(myapp);

}).call(this);

(function() {
  (function() {
    'use strict';
    var CollectionStorage, collection, model, util;
    model = this.model;
    collection = this.collection;
    util = this.util;
    collection.Base = Backbone.Collection.extend({
      storage: null,
      sync: util.cachedSync,
      model: model.Base,
      initialize: function() {
        var setStorage,
          _this = this;
        if (this.storageType != null) {
          this.storage = new CollectionStorage("collection:" + this.constructor.name, this.model, this.storageType);
          setStorage = function() {
            return _this.storage.set(_this.toJSON());
          };
          return this.on({
            "add": setStorage,
            "remove": setStorage,
            "reset": setStorage,
            "destroy": function() {
              return _this.storage.remove();
            }
          });
        }
      }
    });
    return CollectionStorage = (function() {
      function CollectionStorage(key, model, storageType) {
        this.key = key;
        this.model = model;
        switch (storageType) {
          case "session":
            this.storage = util.sessionStorage;
            break;
          case "local":
            this.storage = util.localStorage;
            break;
          default:
            throw new Error("storageType is allowed 'session' or 'local'");
        }
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
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  (function() {
    'use strict';
    var collection, model, _ref;
    model = this.model;
    collection = this.collection;
    return collection.Users = (function(_super) {
      __extends(Users, _super);

      function Users() {
        _ref = Users.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Users.prototype.url = "/users/";

      Users.prototype.model = model.User;

      Users.prototype.storageType = "session";

      return Users;

    })(collection.Base);
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
        this.$el.html(this.tmpl(data));
        return this;
      }
    });
  }).call(myapp);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  (function() {
    'use strict';
    var view, _ref;
    view = this.view;
    return view.Error = (function(_super) {
      __extends(Error, _super);

      function Error() {
        _ref = Error.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Error.prototype.tmpl = JST['error'];

      return Error;

    })(view.Base);
  }).call(myapp);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  (function() {
    'use strict';
    var view, _ref;
    view = this.view;
    return view.Friends = (function(_super) {
      __extends(Friends, _super);

      function Friends() {
        _ref = Friends.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Friends.prototype.tmpl = JST['friends'];

      Friends.prototype.show = function(users) {
        return this.render({
          friends: users.toJSON()
        });
      };

      return Friends;

    })(view.Base);
  }).call(myapp);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  (function() {
    'use strict';
    var view, _ref;
    view = this.view;
    return view.My = (function(_super) {
      __extends(My, _super);

      function My() {
        _ref = My.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      My.prototype.tmpl = JST['my'];

      My.prototype.show = function(user) {
        return this.render({
          user: user.toJSON()
        });
      };

      return My;

    })(view.Base);
  }).call(myapp);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  (function() {
    'use strict';
    var app, view, _ref;
    app = this.app;
    view = this.view;
    return view.Top = (function(_super) {
      __extends(Top, _super);

      function Top() {
        _ref = Top.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Top.prototype.tmpl = JST['top'];

      return Top;

    })(view.Base);
  }).call(myapp);

}).call(this);

(function() {
  (function() {
    'use strict';
    return myapp.App.start();
  })();

}).call(this);
