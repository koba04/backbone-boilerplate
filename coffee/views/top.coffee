( ->
  'use strict'

  app = @app
  view = @view

  view.Top = view.Base.extend
    tmpl: app.template.get 'top'

).call myapp
