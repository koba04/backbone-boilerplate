do ->
  'use strict'

  MyApp.View.Main.Default = MyApp.View.MainView.extend
    tmpl: MyApp.JST['main/default']

    show: (user) ->
      @render(user)
