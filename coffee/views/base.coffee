( (view) ->
  'use strict'

  view.Base = Backbone.View.extend
    render: (data) ->
      @$el.html @tmpl(data)

).call(this, myapp.view)
