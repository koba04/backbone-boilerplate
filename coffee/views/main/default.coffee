( (MainView, main, app) ->
  'use strict'

  main.Default = MainView.extend
    tmpl: app.template.get 'main/default'

    show: (user) ->
      @render user: user.toJSON()

).call(this, myapp.view.MainView,  myapp.view.main, myapp.app)
