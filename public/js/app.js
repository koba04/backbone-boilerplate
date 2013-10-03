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
    var router;
    MyApp.Router = Backbone.Router.extend({
      routes: {
        "": "top"
      },
      top: function() {
        new MyApp.View.Main.Default().render();
        return new MyApp.View.Sub.Top().render();
      }
    });
    router = new MyApp.Router();
    return Backbone.history.start();
  })();

}).call(this);
