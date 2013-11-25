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
      item: {},
      collection: {},
      composite: {},
      layout: {}
    };
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
        var topView;
        topView = new view.layout.Top();
        return myapp.App.content.show(topView);
      },
      error: function() {
        var errorView;
        errorView = new view.layout.Error();
        return myapp.App.content.show(errorView);
      },
      my: function() {
        var my;
        my = new model.User({
          id: 1
        });
        return my.fetch({
          success: function() {
            var myView;
            myView = new view.layout.My({
              model: my
            });
            return myapp.App.content.show(myView);
          }
        });
      },
      friends: function() {
        return new view.layout.Friends().show();
      }
    };
  }).call(myapp);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  (function() {
    'use strict';
    var _ref;
    return this.Router = (function(_super) {
      __extends(Router, _super);

      function Router() {
        _ref = Router.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Router.prototype.controller = myapp.Controller;

      Router.prototype.appRoutes = {
        "": "top",
        "error/": "error",
        "my/": "my",
        "friends/": "friends"
      };

      Router.prototype.assign = function(path) {
        return Backbone.history.navigate("#" + path, {
          replace: false
        });
      };

      Router.prototype.replace = function(path) {
        return Backbone.history.navigate("#" + path, {
          replace: true
        });
      };

      return Router;

    })(Backbone.Marionette.AppRouter);
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
    App.addRegions({
      content: "#content"
    });
    return myapp.App = App;
  }).call(myapp);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  (function() {
    'use strict';
    var ModelStorage, model, util, _ref;
    model = this.model;
    util = this.util;
    model.Base = (function(_super) {
      __extends(Base, _super);

      function Base() {
        _ref = Base.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Base.prototype.storage = null;

      Base.prototype.sync = util.cachedSync;

      Base.prototype.initialize = function(attrs) {
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
      };

      return Base;

    })(Backbone.Model);
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
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  (function() {
    'use strict';
    var CollectionStorage, collection, model, util, _ref;
    model = this.model;
    collection = this.collection;
    util = this.util;
    collection.Base = (function(_super) {
      __extends(Base, _super);

      function Base() {
        _ref = Base.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Base.prototype.storage = null;

      Base.prototype.sync = util.cachedSync;

      Base.prototype.model = model.Base;

      Base.prototype.initialize = function() {
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
      };

      return Base;

    })(Backbone.Collection);
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
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  (function() {
    'use strict';
    var view, _ref;
    view = this.view;
    return view.item.Friend = (function(_super) {
      __extends(Friend, _super);

      function Friend() {
        _ref = Friend.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Friend.prototype.template = JST['items/friend'];

      return Friend;

    })(Backbone.Marionette.ItemView);
  }).call(myapp);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  (function() {
    'use strict';
    var view, _ref;
    view = this.view;
    return view.collection.Friends = (function(_super) {
      __extends(Friends, _super);

      function Friends() {
        _ref = Friends.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Friends.prototype.itemView = view.item.Friend;

      return Friends;

    })(Backbone.Marionette.CollectionView);
  }).call(myapp);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  (function() {
    'use strict';
    var _ref;
    return this.view.layout.Error = (function(_super) {
      __extends(Error, _super);

      function Error() {
        _ref = Error.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Error.prototype.template = JST['layouts/error'];

      return Error;

    })(Backbone.Marionette.Layout);
  }).call(myapp);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  (function() {
    'use strict';
    var collection, view, _ref;
    view = this.view;
    collection = this.collection;
    return view.layout.Friends = (function(_super) {
      __extends(Friends, _super);

      function Friends() {
        _ref = Friends.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Friends.prototype.template = JST['layouts/friends'];

      Friends.prototype.regions = {
        friends: "#friends"
      };

      Friends.prototype.show = function() {
        var users,
          _this = this;
        users = new collection.Users();
        return users.fetch({
          success: function() {
            myapp.App.content.show(_this);
            return _this.friends.show(new view.collection.Friends({
              collection: users
            }));
          }
        });
      };

      return Friends;

    })(Backbone.Marionette.Layout);
  }).call(myapp);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  (function() {
    'use strict';
    var _ref;
    return this.view.layout.My = (function(_super) {
      __extends(My, _super);

      function My() {
        _ref = My.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      My.prototype.template = JST['layouts/my'];

      return My;

    })(Backbone.Marionette.Layout);
  }).call(myapp);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  (function() {
    'use strict';
    var _ref;
    return this.view.layout.Top = (function(_super) {
      __extends(Top, _super);

      function Top() {
        _ref = Top.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Top.prototype.template = JST['layouts/top'];

      return Top;

    })(Backbone.Marionette.Layout);
  }).call(myapp);

}).call(this);

(function() {
  (function() {
    'use strict';
    myapp.App.start();
    return Backbone.history.start();
  })();

}).call(this);
