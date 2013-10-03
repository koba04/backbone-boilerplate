do ->
  'use strict'

  MyApp.View.Sub.Top = MyApp.View.SubView.extend
    tmpl: MyApp.JST['sub/top']
    render: ->
      @$el.html @tmpl()
