( (MainView, main) ->
  'use strict'

  main.Top = MainView.extend
    tmpl: MainView.JST 'main/top'

).call(this, myapp.view.MainView,  myapp.view.main)
