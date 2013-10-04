do ->
  'use strict'

  MyApp.View.Sub.My = MyApp.View.SubView.extend
    tmpl: MyApp.JST['sub/my']

    show: ->
      MyApp.Util.Http.get('/api/my/').next (data) =>
        @render(data)

    render: (user) ->
      console.dir user
      @$el.html @tmpl(user)
