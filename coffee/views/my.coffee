( ->
  'use strict'

  app = @app
  view = @view

  class view.My extends view.Base
    tmpl: app.template.get 'my'
    show: (user) ->
      @render user: user.toJSON()
).call myapp
