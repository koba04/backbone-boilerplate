do ->
  'use strict'

  MyApp.View.Sub.My = MyApp.View.SubView.extend
    tmpl: MyApp.JST['sub/my']

    show: (user) ->
      @render(user)
