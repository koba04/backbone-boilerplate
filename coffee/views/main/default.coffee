( ->
  'use strict'

  a = @app
  v = @view

  v.main.Default = v.MainView.extend
    tmpl: a.template.get 'main/default'

    show: (user) ->
      @render user: user.toJSON()

).call myapp
