do ->
  'use strict'

  MyApp.View.MainView = Backbone.View.extend
    el: $('#mainview')
    render: (data) ->
      @$el.html @tmpl(data)
