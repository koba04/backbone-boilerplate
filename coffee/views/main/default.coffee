( (MainView, main) ->
  'use strict'

  main.Default = MainView.extend
    tmpl: MainView.JST 'main/default'

    show: (user) ->
      @render user: user.toJSON()

).call(this, myapp.view.MainView,  myapp.view.main)
