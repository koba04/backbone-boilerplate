( ->
  'use strict'

  v = @view

  v.Base = Backbone.View.extend
    render: (data) ->
      @$el.html @tmpl(data)

).call myapp
