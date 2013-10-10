( ->
  'use strict'

  a = @app
  v = @view

  v.main.Top = v.MainView.extend
    tmpl: a.template.get 'main/top'

).call myapp
