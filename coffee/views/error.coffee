( ->
  'use strict'

  app = @app
  view = @view

  class view.Error extends view.Base
    tmpl: app.template.get 'error'

).call myapp
