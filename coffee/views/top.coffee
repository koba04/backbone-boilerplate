( ->
  'use strict'

  app = @app
  view = @view

  class view.Top extends view.Base
    tmpl: app.template.get 'top'

).call myapp
