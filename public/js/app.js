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


},{"myapp/collections/base":"+chpI0","myapp/models/user":"b51ifI"}],"myapp/controller":[function(require,module,exports){
module.exports=require('VvtH1o');
},{}],"VvtH1o":[function(require,module,exports){
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


},{"myapp/app":"6MciEj","myapp/collections/users":"gmSmhJ","myapp/views/layouts/error":"BpCbbU","myapp/views/layouts/top":"33Bl1V"}],"3kKKBP":[function(require,module,exports){
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
},{}],"myapp/models/user":[function(require,module,exports){
module.exports=require('b51ifI');
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


},{"myapp/models/base":"3kKKBP"}],"myapp/router":[function(require,module,exports){
module.exports=require('u5GI7r');
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


},{"myapp/controller":"VvtH1o"}],"tLgW31":[function(require,module,exports){
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


},{}],"myapp/template":[function(require,module,exports){
module.exports=require('tLgW31');
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
},{}]},{},["6MciEj","+chpI0","gmSmhJ","VvtH1o","3kKKBP","b51ifI","u5GI7r","tLgW31","ph/WQ5","nKj0s3","BpCbbU","33Bl1V"])