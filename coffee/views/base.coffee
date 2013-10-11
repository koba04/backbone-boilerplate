( ->
  'use strict'

  view = @view

  view.Base = Backbone.View.extend
    el: $('#content')
    render: (data) ->
      @$el.html @tmpl(data)

).call myapp
