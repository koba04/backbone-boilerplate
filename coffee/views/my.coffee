( ->
  'use strict'

  app = @app
  view = @view

  view.My = view.Base.extend
    tmpl: app.template.get 'my'

    show: (user) ->
      @render user: user.toJSON()
).call myapp
