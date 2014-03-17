require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"6MciEj":[function(require,module,exports){
'use strict';
var App,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

App = (function(_super) {
  __extends(App, _super);

  function App() {
    App.__super__.constructor.apply(this, arguments);
    this.addInitializer((function(_this) {
      return function(options) {
        _this.addRegions({
          content: "#content"
        });
        $.ajaxSettings.timeout = 5000;
        return $.ajaxSettings.cache = false;
      };
    })(this));
    this.on("initialize:after", function(options) {
      if (!Backbone.History.started) {
        return Backbone.history.start();
      }
    });
    $((function(_this) {
      return function() {
        return _this.start();
      };
    })(this));
  }

  return App;

})(Backbone.Marionette.Application);

module.exports = new App;


},{}],"myapp/app":[function(require,module,exports){
module.exports=require('6MciEj');
},{}],"myapp/collections/base":[function(require,module,exports){
module.exports=require('+chpI0');
},{}],"+chpI0":[function(require,module,exports){
'use strict';
var Model,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Model = require('myapp/models/base');

module.exports = (function(_super) {
  __extends(_Class, _super);

  function _Class() {
    return _Class.__super__.constructor.apply(this, arguments);
  }

  _Class.prototype.model = Model;

  return _Class;

})(Backbone.Collection);


},{"myapp/models/base":"3kKKBP"}],"myapp/collections/users":[function(require,module,exports){
module.exports=require('gmSmhJ');
},{}],"gmSmhJ":[function(require,module,exports){
'use strict';
var Base, User, Users,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Base = require('myapp/collections/base');

User = require('myapp/models/user');

Users = (function(_super) {
  __extends(Users, _super);

  function Users() {
    return Users.__super__.constructor.apply(this, arguments);
  }

  Users.prototype.url = "/users/";

  Users.prototype.model = User;

  return Users;

})(Base);

module.exports = new Users;


},{"myapp/collections/base":"+chpI0","myapp/models/user":"b51ifI"}],"VvtH1o":[function(require,module,exports){
'use strict';
var App, ErrorView, TopView, users;

App = require('myapp/app');

users = require('myapp/collections/users');

TopView = require('myapp/views/layouts/top');

ErrorView = require('myapp/views/layouts/error');

module.exports = {
  top: function() {
    return users.fetch().done((function(_this) {
      return function() {
        return App.content.show(new TopView({
          collection: users
        }));
      };
    })(this));
  },
  error: function() {
    return App.content.show(new ErrorView());
  }
};


},{"myapp/app":"6MciEj","myapp/collections/users":"gmSmhJ","myapp/views/layouts/error":"BpCbbU","myapp/views/layouts/top":"33Bl1V"}],"myapp/controller":[function(require,module,exports){
module.exports=require('VvtH1o');
},{}],"3kKKBP":[function(require,module,exports){
'use strict';
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = (function(_super) {
  __extends(_Class, _super);

  function _Class() {
    return _Class.__super__.constructor.apply(this, arguments);
  }

  return _Class;

})(Backbone.Model);


},{}],"myapp/models/base":[function(require,module,exports){
module.exports=require('3kKKBP');
},{}],"b51ifI":[function(require,module,exports){
'use strict';
var Base,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Base = require('myapp/models/base');

module.exports = (function(_super) {
  __extends(_Class, _super);

  function _Class() {
    return _Class.__super__.constructor.apply(this, arguments);
  }

  _Class.prototype.urlRoot = "/users/";

  _Class.prototype.initialize = function(attrs) {
    _Class.__super__.initialize.apply(this, arguments);
    return this.name = attrs.name;
  };

  return _Class;

})(Base);


},{"myapp/models/base":"3kKKBP"}],"myapp/models/user":[function(require,module,exports){
module.exports=require('b51ifI');
},{}],"u5GI7r":[function(require,module,exports){
'use strict';
var Controller, Router,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Controller = require('myapp/controller');

Router = (function(_super) {
  __extends(Router, _super);

  function Router() {
    return Router.__super__.constructor.apply(this, arguments);
  }

  Router.prototype.controller = Controller;

  Router.prototype.appRoutes = {
    "": "top",
    "error": "error"
  };

  return Router;

})(Backbone.Marionette.AppRouter);

module.exports = new Router;


},{"myapp/controller":"VvtH1o"}],"myapp/router":[function(require,module,exports){
module.exports=require('u5GI7r');
},{}],"myapp/template":[function(require,module,exports){
module.exports=require('tLgW31');
},{}],"tLgW31":[function(require,module,exports){
'use strict';
module.exports = (function() {
  function _Class() {
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

  _Class.prototype.helper = {
    equal: function(a, b, options) {
      if (a === b) {
        return options.fn(this);
      } else {
        return options.inverse(this);
      }
    }
  };

  _Class.prototype.particles = [];

  return _Class;

})();


},{}],"myapp/views/collections/users":[function(require,module,exports){
module.exports=require('ph/WQ5');
},{}],"ph/WQ5":[function(require,module,exports){
'use strict';
var UserView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

UserView = require('myapp/views/items/user_row');

module.exports = (function(_super) {
  __extends(_Class, _super);

  function _Class() {
    return _Class.__super__.constructor.apply(this, arguments);
  }

  _Class.prototype.itemView = UserView;

  return _Class;

})(Backbone.Marionette.CollectionView);


},{"myapp/views/items/user_row":"nKj0s3"}],"myapp/views/items/user_row":[function(require,module,exports){
module.exports=require('nKj0s3');
},{}],"nKj0s3":[function(require,module,exports){
'use strict';
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = (function(_super) {
  __extends(_Class, _super);

  function _Class() {
    return _Class.__super__.constructor.apply(this, arguments);
  }

  _Class.prototype.template = JST['items/user_row'];

  return _Class;

})(Backbone.Marionette.ItemView);


},{}],"BpCbbU":[function(require,module,exports){
'use strict';
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = (function(_super) {
  __extends(_Class, _super);

  function _Class() {
    return _Class.__super__.constructor.apply(this, arguments);
  }

  _Class.prototype.template = JST['layouts/error'];

  return _Class;

})(Backbone.Marionette.Layout);


},{}],"myapp/views/layouts/error":[function(require,module,exports){
module.exports=require('BpCbbU');
},{}],"33Bl1V":[function(require,module,exports){
'use strict';
var UsersView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

UsersView = require('myapp/views/collections/users');

module.exports = (function(_super) {
  __extends(_Class, _super);

  function _Class() {
    return _Class.__super__.constructor.apply(this, arguments);
  }

  _Class.prototype.template = JST['layouts/top'];

  _Class.prototype.regions = {
    users: ".js-users"
  };

  _Class.prototype.onRender = function() {
    return this.users.show(new UsersView({
      collection: this.collection
    }));
  };

  return _Class;

})(Backbone.Marionette.Layout);


},{"myapp/views/collections/users":"ph/WQ5"}],"myapp/views/layouts/top":[function(require,module,exports){
module.exports=require('33Bl1V');
},{}],25:[function(require,module,exports){
describe("App", function() {
  var App, Router;
  App = require('myapp/app');
  Router = require('myapp/router');
  return describe("initialize", function() {
    it("App isa Backbone.Marionette.Application", function() {
      return expect(App).to.be.a(Backbone.Marionette.Application);
    });
    it("create content region", function() {
      return expect(App.content).to.be.a(Backbone.Marionette.Region);
    });
    return it("Backbone.History is started", function() {
      return expect(Backbone.History.started).to.be.ok();
    });
  });
});


},{"myapp/app":"6MciEj","myapp/router":"u5GI7r"}],26:[function(require,module,exports){
describe("Collection.Base", function() {
  var Collection, Model, collection;
  Collection = require('myapp/collections/base');
  Model = require('myapp/models/base');
  collection = null;
  beforeEach(function() {
    return collection = new Collection;
  });
  it("extends Basebone.Collection", function() {
    return expect(collection).to.be.a(Backbone.Collection);
  });
  return it("has Model.Base", function() {
    return expect(collection.model).to.be(Model);
  });
});


},{"myapp/collections/base":"+chpI0","myapp/models/base":"3kKKBP"}],27:[function(require,module,exports){
describe("Collection.Users", function() {
  var Base, User, users;
  users = require('myapp/collections/users');
  Base = require('myapp/collections/base');
  User = require('myapp/models/user');
  beforeEach(function() {
    return users = new users.constructor;
  });
  it("extends Collection.Base", function() {
    return expect(users).to.be.a(Base);
  });
  it("url is /users/", function() {
    return expect(users.url).to.be("/users/");
  });
  return it("model is Model.User", function() {
    return expect(users.model).to.be(User);
  });
});


},{"myapp/collections/base":"+chpI0","myapp/collections/users":"gmSmhJ","myapp/models/user":"b51ifI"}],28:[function(require,module,exports){
describe("Controller", function() {
  var App, Controller, ErrorView, TopView, users;
  App = require('myapp/app');
  Controller = require('myapp/controller');
  users = require('myapp/collections/users');
  TopView = require('myapp/views/layouts/top');
  ErrorView = require('myapp/views/layouts/error');
  describe("top", function() {
    beforeEach(function() {
      sinon.stub(users, "fetch", function() {
        return $.Deferred().resolve().promise();
      });
      return Controller.top();
    });
    afterEach(function() {
      return users.fetch.restore();
    });
    it("after fetched users, show TopView in content regions", function() {
      return expect(App.content.currentView).to.be.a(TopView);
    });
    return it("TopView has users as collection", function() {
      return expect(App.content.currentView.collection).to.be(users);
    });
  });
  return describe("error", function() {
    beforeEach(function() {
      return Controller.error();
    });
    return it("show ErrorView in content regions", function() {
      return expect(App.content.currentView).to.be.a(ErrorView);
    });
  });
});


},{"myapp/app":"6MciEj","myapp/collections/users":"gmSmhJ","myapp/controller":"VvtH1o","myapp/views/layouts/error":"BpCbbU","myapp/views/layouts/top":"33Bl1V"}],29:[function(require,module,exports){
describe("model.Base", function() {
  var Base, model;
  Base = require('myapp/models/base');
  model = null;
  beforeEach(function() {
    return model = new Base;
  });
  return it("extends Basebone.Model", function() {
    return expect(model).to.be.a(Backbone.Model);
  });
});


},{"myapp/models/base":"3kKKBP"}],30:[function(require,module,exports){
describe("Model.User", function() {
  var Base, User, user;
  User = require('myapp/models/user');
  Base = require('myapp/models/base');
  user = null;
  beforeEach(function() {
    return user = new User({
      name: "jim"
    });
  });
  it("extends Base", function() {
    return expect(user).to.be.a(Base);
  });
  it("urlRoot is /users/", function() {
    return expect(user.urlRoot).to.be("/users/");
  });
  return it("name property set by initialize", function() {
    return expect(user.get("name")).to.be("jim");
  });
});


},{"myapp/models/base":"3kKKBP","myapp/models/user":"b51ifI"}],31:[function(require,module,exports){
describe("Router", function() {
  var Controller, router;
  router = require('myapp/router');
  Controller = require('myapp/controller');
  it("extends Marionette.AppRouter", function() {
    return expect(router).to.be.a(Backbone.Marionette.AppRouter);
  });
  return it("has Controller", function() {
    return expect(router.controller).to.be(Controller);
  });
});


},{"myapp/controller":"VvtH1o","myapp/router":"u5GI7r"}],32:[function(require,module,exports){
describe("Template", function() {
  var Template, template;
  Template = require('myapp/template');
  template = null;
  beforeEach(function() {
    return template = new Template();
  });
  return describe("helper", function() {
    return describe("equal", function() {
      it("a is b, invoke options.fn", function(done) {
        return template.helper.equal("a", "a", {
          fn: function() {
            return done();
          },
          inverse: function() {}
        });
      });
      return it("a isnt b, invoke options.inverse", function(done) {
        return template.helper.equal("a", "b", {
          fn: function() {},
          inverse: function() {
            return done();
          }
        });
      });
    });
  });
});


},{"myapp/template":"tLgW31"}],33:[function(require,module,exports){
describe("View.Collection.Users", function() {
  var UserRowView, UsersView, view;
  UsersView = require('myapp/views/collections/users');
  UserRowView = require('myapp/views/items/user_row');
  view = null;
  beforeEach(function() {
    return view = new UsersView;
  });
  it("exnteds Marionette.CollectionView", function() {
    return expect(view).to.be.a(Backbone.Marionette.CollectionView);
  });
  return it("has view.item.Friend as ItemView", function() {
    return expect(view.itemView).to.be(UserRowView);
  });
});


},{"myapp/views/collections/users":"ph/WQ5","myapp/views/items/user_row":"nKj0s3"}],34:[function(require,module,exports){
describe("View.Item.UserRow", function() {
  var UserRowView, view;
  UserRowView = require('myapp/views/items/user_row');
  view = null;
  beforeEach(function() {
    return view = new UserRowView;
  });
  it("extends Marionette.ItemView", function() {
    return expect(view).to.be.a(Backbone.Marionette.ItemView);
  });
  return it("template is items/user_row", function() {
    return expect(view.template).to.be(JST['items/user_row']);
  });
});


},{"myapp/views/items/user_row":"nKj0s3"}],35:[function(require,module,exports){
describe("View.Layout.Error", function() {
  var ErrorView, view;
  ErrorView = require('myapp/views/layouts/error');
  view = null;
  beforeEach(function() {
    return view = new ErrorView;
  });
  it("extends Marionette.Layout", function() {
    return expect(view).to.be.a(Backbone.Marionette.Layout);
  });
  return it("template is layouts/error", function() {
    return expect(view.template).to.be(JST['layouts/error']);
  });
});


},{"myapp/views/layouts/error":"BpCbbU"}],36:[function(require,module,exports){
describe("view.layout.Top", function() {
  var TopView, UsersView, view;
  TopView = require('myapp/views/layouts/top');
  UsersView = require('myapp/views/collections/users');
  view = null;
  beforeEach(function() {
    return view = new TopView;
  });
  it("extends Marionette.Layout", function() {
    return expect(view).to.be.a(Backbone.Marionette.Layout);
  });
  it("template is layouts/top", function() {
    return expect(view.template).to.be(JST['layouts/top']);
  });
  return describe("onRender", function() {
    beforeEach(function() {
      return view.render();
    });
    return it("View.Collection.Users added to users regison", function() {
      expect(view.users.currentView).to.be.a(UsersView);
      return expect(view.users.currentView.collections).to.be(view.collection);
    });
  });
});


},{"myapp/views/collections/users":"ph/WQ5","myapp/views/layouts/top":"33Bl1V"}]},{},[25,26,27,28,29,30,31,32,33,34,35,36])