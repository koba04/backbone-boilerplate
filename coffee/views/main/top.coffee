( (MainView, main, app) ->
  'use strict'

  main.Top = MainView.extend
    tmpl: app.template.get 'main/top'

).call(this, myapp.view.MainView,  myapp.view.main, myapp.app)
