require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"6MciEj":[function(require,module,exports){
'use strict';
var $, App, Backbone,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$ = require('jquery');

Backbone = require('backbone');

App = (function(_super) {
  __extends(App, _super);

  function App() {
    App.__super__.constructor.apply(this, arguments);
    this.addInitializer((function(_this) {
      return function(options) {
        _this.addRegions({
          content: "#js-content"
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


},{"backbone":false,"jquery":false}],"myapp/app":[function(require,module,exports){
module.exports=require('6MciEj');
},{}],"+chpI0":[function(require,module,exports){
'use strict';
var Backbone, Model,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Backbone = require('backbone');

Model = require('myapp/models/base');

module.exports = (function(_super) {
  __extends(_Class, _super);

  function _Class() {
    return _Class.__super__.constructor.apply(this, arguments);
  }

  _Class.prototype.model = Model;

  return _Class;

})(Backbone.Collection);


},{"backbone":false,"myapp/models/base":"3kKKBP"}],"myapp/collections/base":[function(require,module,exports){
module.exports=require('+chpI0');
},{}],"myapp/collections/tracks":[function(require,module,exports){
module.exports=require('IOQGak');
},{}],"IOQGak":[function(require,module,exports){
'use strict';
var Base, Track, Tracks,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Base = require('myapp/collections/base');

Track = require('myapp/models/track');

Tracks = (function(_super) {
  __extends(Tracks, _super);

  function Tracks() {
    return Tracks.__super__.constructor.apply(this, arguments);
  }

  Tracks.prototype.model = Track;

  return Tracks;

})(Base);

module.exports = new Tracks;


},{"myapp/collections/base":"+chpI0","myapp/models/track":"uw3S6s"}],"VvtH1o":[function(require,module,exports){
'use strict';
var App, Controller, ErrorView, TopView;

App = require('myapp/app');

TopView = require('myapp/views/layouts/top');

ErrorView = require('myapp/views/layouts/error');

Controller = (function() {
  function Controller() {
    App.vent.on("error", this.error);
  }

  Controller.prototype.top = function() {
    return App.content.show(new TopView);
  };

  Controller.prototype.error = function() {
    return App.content.show(new ErrorView());
  };

  return Controller;

})();

module.exports = new Controller;


},{"myapp/app":"6MciEj","myapp/views/layouts/error":"BpCbbU","myapp/views/layouts/top":"33Bl1V"}],"myapp/controller":[function(require,module,exports){
module.exports=require('VvtH1o');
},{}],"rIZGiL":[function(require,module,exports){
'use strict';
var App, Backbone, Base, tracks,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Backbone = require('backbone');

Base = require('myapp/models/base');

App = require('myapp/app');

tracks = require('myapp/collections/tracks');

module.exports = (function(_super) {
  __extends(_Class, _super);

  function _Class() {
    return _Class.__super__.constructor.apply(this, arguments);
  }

  _Class.prototype.urlRoot = "http://ws.audioscrobbler.com/2.0/?api_key=b867bf0fdfe95e6c6dc31a275535f765&format=json";

  _Class.prototype.fetchTopTracks = function() {
    if (!this.id) {
      return;
    }
    return Backbone.$.ajax({
      dataType: "json",
      url: this.urlRoot,
      data: {
        method: "artist.gettoptracks",
        artist: this.id
      }
    }).done(function(data) {
      return tracks.reset(data.toptracks.track);
    }).fail(function() {
      return App.vent.trigger("error");
    });
  };

  return _Class;

})(Base);


},{"backbone":false,"myapp/app":"6MciEj","myapp/collections/tracks":"IOQGak","myapp/models/base":"3kKKBP"}],"myapp/models/artist":[function(require,module,exports){
module.exports=require('rIZGiL');
},{}],"myapp/models/base":[function(require,module,exports){
module.exports=require('3kKKBP');
},{}],"3kKKBP":[function(require,module,exports){
'use strict';
var Backbone,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Backbone = require('backbone');

module.exports = (function(_super) {
  __extends(_Class, _super);

  function _Class() {
    return _Class.__super__.constructor.apply(this, arguments);
  }

  return _Class;

})(Backbone.Model);


},{"backbone":false}],"myapp/models/track":[function(require,module,exports){
module.exports=require('uw3S6s');
},{}],"uw3S6s":[function(require,module,exports){
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

  _Class.prototype.idAttribute = "mbid";

  _Class.prototype.toJSON = function() {
    var data;
    data = _Class.__super__.toJSON.apply(this, arguments);
    if (this.get("@attr") != null) {
      data.rank = this.get("@attr").rank;
    }
    return data;
  };

  return _Class;

})(Base);


},{"myapp/models/base":"3kKKBP"}],"u5GI7r":[function(require,module,exports){
'use strict';
var Backbone, Controller, Router,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Backbone = require('backbone');

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


},{"backbone":false,"myapp/controller":"VvtH1o"}],"myapp/router":[function(require,module,exports){
module.exports=require('u5GI7r');
},{}],"tLgW31":[function(require,module,exports){
'use strict';
var Handlebars, Template;

Handlebars = require('handlebars');

Template = (function() {
  function Template() {
    var fn, name, partial, _i, _len, _ref, _ref1;
    _ref = this.helper;
    for (name in _ref) {
      fn = _ref[name];
      Handlebars.registerHelper(name, fn);
    }
    _ref1 = this.partials;
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      partial = _ref1[_i];
      Handlebars.registerPartial(partial, require("template/partials/" + partial));
    }
  }

  Template.prototype.helper = {
    equal: function(a, b, options) {
      if (a === b) {
        return options.fn(this);
      } else {
        return options.inverse(this);
      }
    }
  };

  Template.prototype.partials = [];

  return Template;

})();

module.exports = new Template();


},{"handlebars":false}],"myapp/template":[function(require,module,exports){
module.exports=require('tLgW31');
},{}],"myapp/views/collections/tracks":[function(require,module,exports){
module.exports=require('EltcrF');
},{}],"EltcrF":[function(require,module,exports){
'use strict';
var Backbone, TrackView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Backbone = require('backbone');

TrackView = require('myapp/views/items/track');

module.exports = (function(_super) {
  __extends(_Class, _super);

  function _Class() {
    return _Class.__super__.constructor.apply(this, arguments);
  }

  _Class.prototype.tagName = "ul";

  _Class.prototype.className = "list-group";

  _Class.prototype.itemView = TrackView;

  return _Class;

})(Backbone.Marionette.CollectionView);


},{"backbone":false,"myapp/views/items/track":"TOhsxB"}],"RgTt1z":[function(require,module,exports){
'use strict';
var Backbone, artist, template,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Backbone = require('backbone');

template = require('template/items/artist_search');

artist = require('myapp/models/artist');

module.exports = (function(_super) {
  __extends(_Class, _super);

  function _Class() {
    return _Class.__super__.constructor.apply(this, arguments);
  }

  _Class.prototype.template = template;

  _Class.prototype.ui = {
    artist: ".js-input-artist"
  };

  _Class.prototype.triggers = {
    "submit .js-fetch-top-tracks": "fetch:top:tracks"
  };

  _Class.prototype.onFetchTopTracks = function() {
    this.model.set("id", this.ui.artist.val());
    return this.model.fetchTopTracks();
  };

  return _Class;

})(Backbone.Marionette.ItemView);


},{"backbone":false,"myapp/models/artist":"rIZGiL","template/items/artist_search":"9A746c"}],"myapp/views/items/artist_search":[function(require,module,exports){
module.exports=require('RgTt1z');
},{}],"TOhsxB":[function(require,module,exports){
'use strict';
var Backbone, template,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Backbone = require('backbone');

template = require('template/items/track');

module.exports = (function(_super) {
  __extends(_Class, _super);

  function _Class() {
    return _Class.__super__.constructor.apply(this, arguments);
  }

  _Class.prototype.tagName = "li";

  _Class.prototype.className = "list-group-item";

  _Class.prototype.template = template;

  return _Class;

})(Backbone.Marionette.ItemView);


},{"backbone":false,"template/items/track":"thxVgA"}],"myapp/views/items/track":[function(require,module,exports){
module.exports=require('TOhsxB');
},{}],"BpCbbU":[function(require,module,exports){
'use strict';
var Backbone, template,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Backbone = require('backbone');

template = require('template/layouts/error');

module.exports = (function(_super) {
  __extends(_Class, _super);

  function _Class() {
    return _Class.__super__.constructor.apply(this, arguments);
  }

  _Class.prototype.template = template;

  return _Class;

})(Backbone.Marionette.Layout);


},{"backbone":false,"template/layouts/error":"qRFBid"}],"myapp/views/layouts/error":[function(require,module,exports){
module.exports=require('BpCbbU');
},{}],"33Bl1V":[function(require,module,exports){
'use strict';
var Artist, ArtistSearchView, Backbone, TracksView, template, tracks,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Backbone = require('backbone');

ArtistSearchView = require('myapp/views/items/artist_search');

TracksView = require('myapp/views/collections/tracks');

Artist = require('myapp/models/artist');

tracks = require('myapp/collections/tracks');

template = require('template/layouts/top');

module.exports = (function(_super) {
  __extends(_Class, _super);

  function _Class() {
    return _Class.__super__.constructor.apply(this, arguments);
  }

  _Class.prototype.template = template;

  _Class.prototype.regions = {
    artistSearch: ".js-artist-search",
    topTracks: ".js-top-tracks"
  };

  _Class.prototype.onRender = function() {
    this.artistSearch.show(new ArtistSearchView({
      model: new Artist
    }));
    return this.listenTo(tracks, 'reset', this.showTracks);
  };

  _Class.prototype.showTracks = function() {
    return this.topTracks.show(new TracksView({
      collection: tracks
    }));
  };

  return _Class;

})(Backbone.Marionette.Layout);


},{"backbone":false,"myapp/collections/tracks":"IOQGak","myapp/models/artist":"rIZGiL","myapp/views/collections/tracks":"EltcrF","myapp/views/items/artist_search":"RgTt1z","template/layouts/top":"G4v84a"}],"myapp/views/layouts/top":[function(require,module,exports){
module.exports=require('33Bl1V');
},{}],29:[function(require,module,exports){

},{}],30:[function(require,module,exports){
"use strict";
/*globals Handlebars: true */
var base = require("./handlebars/base");

// Each of these augment the Handlebars object. No need to setup here.
// (This is done to easily share code between commonjs and browse envs)
var SafeString = require("./handlebars/safe-string")["default"];
var Exception = require("./handlebars/exception")["default"];
var Utils = require("./handlebars/utils");
var runtime = require("./handlebars/runtime");

// For compatibility and usage outside of module systems, make the Handlebars object a namespace
var create = function() {
  var hb = new base.HandlebarsEnvironment();

  Utils.extend(hb, base);
  hb.SafeString = SafeString;
  hb.Exception = Exception;
  hb.Utils = Utils;

  hb.VM = runtime;
  hb.template = function(spec) {
    return runtime.template(spec, hb);
  };

  return hb;
};

var Handlebars = create();
Handlebars.create = create;

exports["default"] = Handlebars;
},{"./handlebars/base":31,"./handlebars/exception":32,"./handlebars/runtime":33,"./handlebars/safe-string":34,"./handlebars/utils":35}],31:[function(require,module,exports){
"use strict";
var Utils = require("./utils");
var Exception = require("./exception")["default"];

var VERSION = "1.3.0";
exports.VERSION = VERSION;var COMPILER_REVISION = 4;
exports.COMPILER_REVISION = COMPILER_REVISION;
var REVISION_CHANGES = {
  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
  2: '== 1.0.0-rc.3',
  3: '== 1.0.0-rc.4',
  4: '>= 1.0.0'
};
exports.REVISION_CHANGES = REVISION_CHANGES;
var isArray = Utils.isArray,
    isFunction = Utils.isFunction,
    toString = Utils.toString,
    objectType = '[object Object]';

function HandlebarsEnvironment(helpers, partials) {
  this.helpers = helpers || {};
  this.partials = partials || {};

  registerDefaultHelpers(this);
}

exports.HandlebarsEnvironment = HandlebarsEnvironment;HandlebarsEnvironment.prototype = {
  constructor: HandlebarsEnvironment,

  logger: logger,
  log: log,

  registerHelper: function(name, fn, inverse) {
    if (toString.call(name) === objectType) {
      if (inverse || fn) { throw new Exception('Arg not supported with multiple helpers'); }
      Utils.extend(this.helpers, name);
    } else {
      if (inverse) { fn.not = inverse; }
      this.helpers[name] = fn;
    }
  },

  registerPartial: function(name, str) {
    if (toString.call(name) === objectType) {
      Utils.extend(this.partials,  name);
    } else {
      this.partials[name] = str;
    }
  }
};

function registerDefaultHelpers(instance) {
  instance.registerHelper('helperMissing', function(arg) {
    if(arguments.length === 2) {
      return undefined;
    } else {
      throw new Exception("Missing helper: '" + arg + "'");
    }
  });

  instance.registerHelper('blockHelperMissing', function(context, options) {
    var inverse = options.inverse || function() {}, fn = options.fn;

    if (isFunction(context)) { context = context.call(this); }

    if(context === true) {
      return fn(this);
    } else if(context === false || context == null) {
      return inverse(this);
    } else if (isArray(context)) {
      if(context.length > 0) {
        return instance.helpers.each(context, options);
      } else {
        return inverse(this);
      }
    } else {
      return fn(context);
    }
  });

  instance.registerHelper('each', function(context, options) {
    var fn = options.fn, inverse = options.inverse;
    var i = 0, ret = "", data;

    if (isFunction(context)) { context = context.call(this); }

    if (options.data) {
      data = createFrame(options.data);
    }

    if(context && typeof context === 'object') {
      if (isArray(context)) {
        for(var j = context.length; i<j; i++) {
          if (data) {
            data.index = i;
            data.first = (i === 0);
            data.last  = (i === (context.length-1));
          }
          ret = ret + fn(context[i], { data: data });
        }
      } else {
        for(var key in context) {
          if(context.hasOwnProperty(key)) {
            if(data) { 
              data.key = key; 
              data.index = i;
              data.first = (i === 0);
            }
            ret = ret + fn(context[key], {data: data});
            i++;
          }
        }
      }
    }

    if(i === 0){
      ret = inverse(this);
    }

    return ret;
  });

  instance.registerHelper('if', function(conditional, options) {
    if (isFunction(conditional)) { conditional = conditional.call(this); }

    // Default behavior is to render the positive path if the value is truthy and not empty.
    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
    if ((!options.hash.includeZero && !conditional) || Utils.isEmpty(conditional)) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  });

  instance.registerHelper('unless', function(conditional, options) {
    return instance.helpers['if'].call(this, conditional, {fn: options.inverse, inverse: options.fn, hash: options.hash});
  });

  instance.registerHelper('with', function(context, options) {
    if (isFunction(context)) { context = context.call(this); }

    if (!Utils.isEmpty(context)) return options.fn(context);
  });

  instance.registerHelper('log', function(context, options) {
    var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
    instance.log(level, context);
  });
}

var logger = {
  methodMap: { 0: 'debug', 1: 'info', 2: 'warn', 3: 'error' },

  // State enum
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  level: 3,

  // can be overridden in the host environment
  log: function(level, obj) {
    if (logger.level <= level) {
      var method = logger.methodMap[level];
      if (typeof console !== 'undefined' && console[method]) {
        console[method].call(console, obj);
      }
    }
  }
};
exports.logger = logger;
function log(level, obj) { logger.log(level, obj); }

exports.log = log;var createFrame = function(object) {
  var obj = {};
  Utils.extend(obj, object);
  return obj;
};
exports.createFrame = createFrame;
},{"./exception":32,"./utils":35}],32:[function(require,module,exports){
"use strict";

var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

function Exception(message, node) {
  var line;
  if (node && node.firstLine) {
    line = node.firstLine;

    message += ' - ' + line + ':' + node.firstColumn;
  }

  var tmp = Error.prototype.constructor.call(this, message);

  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
  for (var idx = 0; idx < errorProps.length; idx++) {
    this[errorProps[idx]] = tmp[errorProps[idx]];
  }

  if (line) {
    this.lineNumber = line;
    this.column = node.firstColumn;
  }
}

Exception.prototype = new Error();

exports["default"] = Exception;
},{}],33:[function(require,module,exports){
"use strict";
var Utils = require("./utils");
var Exception = require("./exception")["default"];
var COMPILER_REVISION = require("./base").COMPILER_REVISION;
var REVISION_CHANGES = require("./base").REVISION_CHANGES;

function checkRevision(compilerInfo) {
  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
      currentRevision = COMPILER_REVISION;

  if (compilerRevision !== currentRevision) {
    if (compilerRevision < currentRevision) {
      var runtimeVersions = REVISION_CHANGES[currentRevision],
          compilerVersions = REVISION_CHANGES[compilerRevision];
      throw new Exception("Template was precompiled with an older version of Handlebars than the current runtime. "+
            "Please update your precompiler to a newer version ("+runtimeVersions+") or downgrade your runtime to an older version ("+compilerVersions+").");
    } else {
      // Use the embedded version info since the runtime doesn't know about this revision yet
      throw new Exception("Template was precompiled with a newer version of Handlebars than the current runtime. "+
            "Please update your runtime to a newer version ("+compilerInfo[1]+").");
    }
  }
}

exports.checkRevision = checkRevision;// TODO: Remove this line and break up compilePartial

function template(templateSpec, env) {
  if (!env) {
    throw new Exception("No environment passed to template");
  }

  // Note: Using env.VM references rather than local var references throughout this section to allow
  // for external users to override these as psuedo-supported APIs.
  var invokePartialWrapper = function(partial, name, context, helpers, partials, data) {
    var result = env.VM.invokePartial.apply(this, arguments);
    if (result != null) { return result; }

    if (env.compile) {
      var options = { helpers: helpers, partials: partials, data: data };
      partials[name] = env.compile(partial, { data: data !== undefined }, env);
      return partials[name](context, options);
    } else {
      throw new Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
    }
  };

  // Just add water
  var container = {
    escapeExpression: Utils.escapeExpression,
    invokePartial: invokePartialWrapper,
    programs: [],
    program: function(i, fn, data) {
      var programWrapper = this.programs[i];
      if(data) {
        programWrapper = program(i, fn, data);
      } else if (!programWrapper) {
        programWrapper = this.programs[i] = program(i, fn);
      }
      return programWrapper;
    },
    merge: function(param, common) {
      var ret = param || common;

      if (param && common && (param !== common)) {
        ret = {};
        Utils.extend(ret, common);
        Utils.extend(ret, param);
      }
      return ret;
    },
    programWithDepth: env.VM.programWithDepth,
    noop: env.VM.noop,
    compilerInfo: null
  };

  return function(context, options) {
    options = options || {};
    var namespace = options.partial ? options : env,
        helpers,
        partials;

    if (!options.partial) {
      helpers = options.helpers;
      partials = options.partials;
    }
    var result = templateSpec.call(
          container,
          namespace, context,
          helpers,
          partials,
          options.data);

    if (!options.partial) {
      env.VM.checkRevision(container.compilerInfo);
    }

    return result;
  };
}

exports.template = template;function programWithDepth(i, fn, data /*, $depth */) {
  var args = Array.prototype.slice.call(arguments, 3);

  var prog = function(context, options) {
    options = options || {};

    return fn.apply(this, [context, options.data || data].concat(args));
  };
  prog.program = i;
  prog.depth = args.length;
  return prog;
}

exports.programWithDepth = programWithDepth;function program(i, fn, data) {
  var prog = function(context, options) {
    options = options || {};

    return fn(context, options.data || data);
  };
  prog.program = i;
  prog.depth = 0;
  return prog;
}

exports.program = program;function invokePartial(partial, name, context, helpers, partials, data) {
  var options = { partial: true, helpers: helpers, partials: partials, data: data };

  if(partial === undefined) {
    throw new Exception("The partial " + name + " could not be found");
  } else if(partial instanceof Function) {
    return partial(context, options);
  }
}

exports.invokePartial = invokePartial;function noop() { return ""; }

exports.noop = noop;
},{"./base":31,"./exception":32,"./utils":35}],34:[function(require,module,exports){
"use strict";
// Build out our basic SafeString type
function SafeString(string) {
  this.string = string;
}

SafeString.prototype.toString = function() {
  return "" + this.string;
};

exports["default"] = SafeString;
},{}],35:[function(require,module,exports){
"use strict";
/*jshint -W004 */
var SafeString = require("./safe-string")["default"];

var escape = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "`": "&#x60;"
};

var badChars = /[&<>"'`]/g;
var possible = /[&<>"'`]/;

function escapeChar(chr) {
  return escape[chr] || "&amp;";
}

function extend(obj, value) {
  for(var key in value) {
    if(Object.prototype.hasOwnProperty.call(value, key)) {
      obj[key] = value[key];
    }
  }
}

exports.extend = extend;var toString = Object.prototype.toString;
exports.toString = toString;
// Sourced from lodash
// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
var isFunction = function(value) {
  return typeof value === 'function';
};
// fallback for older versions of Chrome and Safari
if (isFunction(/x/)) {
  isFunction = function(value) {
    return typeof value === 'function' && toString.call(value) === '[object Function]';
  };
}
var isFunction;
exports.isFunction = isFunction;
var isArray = Array.isArray || function(value) {
  return (value && typeof value === 'object') ? toString.call(value) === '[object Array]' : false;
};
exports.isArray = isArray;

function escapeExpression(string) {
  // don't escape SafeStrings, since they're already safe
  if (string instanceof SafeString) {
    return string.toString();
  } else if (!string && string !== 0) {
    return "";
  }

  // Force a string conversion as this will be done by the append regardless and
  // the regex test will do this transparently behind the scenes, causing issues if
  // an object's to string has escaped characters in it.
  string = "" + string;

  if(!possible.test(string)) { return string; }
  return string.replace(badChars, escapeChar);
}

exports.escapeExpression = escapeExpression;function isEmpty(value) {
  if (!value && value !== 0) {
    return true;
  } else if (isArray(value) && value.length === 0) {
    return true;
  } else {
    return false;
  }
}

exports.isEmpty = isEmpty;
},{"./safe-string":34}],36:[function(require,module,exports){
// Create a simple path alias to allow browserify to resolve
// the runtime on a supported path.
module.exports = require('./dist/cjs/handlebars.runtime');

},{"./dist/cjs/handlebars.runtime":30}],"handlebars":[function(require,module,exports){
module.exports=require('pu95bm');
},{}],"pu95bm":[function(require,module,exports){
module.exports = require("handlebars/runtime")["default"];

},{"handlebars/runtime":36}],"9A746c":[function(require,module,exports){
// hbsfy compiled Handlebars template
var Handlebars = require('hbsfy/runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<form class=\"form-horizontal js-fetch-top-tracks\" role=\"form\">\n  <div class=\"form-group\">\n    <label for=\"js-input-location\" class=\"col-sm-1 control-label\">Artist</label>\n    <div class=\"col-sm-11\">\n      <input type=\"text\" class=\"form-control js-input-artist\" placeholder=\"Input Atrist Name\" required>\n    </div>\n  </div>\n  <div class=\"form-group\">\n    <div class=\"col-sm-offset-1 col-sm-11\">\n      <button type=\"submit\" class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-search\">search</span></button>\n    </div>\n  </div>\n</form>\n";
  });

},{"hbsfy/runtime":"pu95bm"}],"template/items/artist_search":[function(require,module,exports){
module.exports=require('9A746c');
},{}],"thxVgA":[function(require,module,exports){
// hbsfy compiled Handlebars template
var Handlebars = require('hbsfy/runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<span class=\"label label-info\">";
  if (helper = helpers.rank) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.rank); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span><a href=\"";
  if (helper = helpers.url) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.url); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" target=\"_blank\">&nbsp;";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "&nbsp;</a><small class=\"glyphicon glyphicon-headphones\">";
  if (helper = helpers.listeners) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.listeners); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</small>\n\n";
  return buffer;
  });

},{"hbsfy/runtime":"pu95bm"}],"template/items/track":[function(require,module,exports){
module.exports=require('thxVgA');
},{}],"template/items/user_row":[function(require,module,exports){
module.exports=require('G1r/Gt');
},{}],"G1r/Gt":[function(require,module,exports){
// hbsfy compiled Handlebars template
var Handlebars = require('hbsfy/runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li>";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ":";
  if (helper = helpers.age) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.age); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</li>\n";
  return buffer;
  });

},{"hbsfy/runtime":"pu95bm"}],"template/layouts/error":[function(require,module,exports){
module.exports=require('qRFBid');
},{}],"qRFBid":[function(require,module,exports){
// hbsfy compiled Handlebars template
var Handlebars = require('hbsfy/runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"alert alert-danger\">\n  Oops..\n  <a href=\"\" class=\"alert-link\">back to top</a>\n</div>\n";
  });

},{"hbsfy/runtime":"pu95bm"}],"template/layouts/top":[function(require,module,exports){
module.exports=require('G4v84a');
},{}],"G4v84a":[function(require,module,exports){
// hbsfy compiled Handlebars template
var Handlebars = require('hbsfy/runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"js-artist-search\"></div>\n<div class=\"js-top-tracks\"></div>\n";
  });

},{"hbsfy/runtime":"pu95bm"}]},{},["6MciEj","+chpI0","IOQGak","VvtH1o","rIZGiL","3kKKBP","uw3S6s","u5GI7r","tLgW31","EltcrF","RgTt1z","TOhsxB","BpCbbU","33Bl1V","9A746c","thxVgA","G1r/Gt","qRFBid","G4v84a"])