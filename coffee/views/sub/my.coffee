do ->
  'use strict'

  MyApp.View.Sub.My = MyApp.View.SubView.extend
    tmpl: MyApp.JST['sub/my']
    render: ->

      MyApp.Util.Http.get "/public", { page: 2 }, (data) ->
        console.dir data

      @$el.html @tmpl()
