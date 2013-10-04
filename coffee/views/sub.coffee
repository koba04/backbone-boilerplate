do ->
  'use strict'

  MyApp.View.SubView = Backbone.View.extend
    el: $('#subview')
    render: (data) ->
      @$el.html @tmpl(data)
