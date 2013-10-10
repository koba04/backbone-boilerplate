( ->
  'use strict'

  v = @view

  v.Base = Backbone.View.extend
    el: $('#content')
    render: (data) ->
      @$el.html @tmpl(data)

).call myapp
