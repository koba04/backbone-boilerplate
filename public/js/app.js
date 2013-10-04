(function() {
  (function() {
    'use strict';
    var MyApp;
    MyApp = window.MyApp;
    MyApp.Model = {};
    MyApp.Collection = {};
    return MyApp.View = {
      Main: {},
      Sub: {}
    };
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
