( (view, JST) ->
  'use strict'

  view.MyApp = Backbone.View.extend({
    render: (data) ->
      @$el.html @tmpl(data)
  }, {
    JST: (template) ->
      JST[template]
  })

).call(this, myapp.view, myapp.JST)
