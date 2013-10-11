( ->
  'use strict'

  app = @app
  view = @view

  view.Friends = view.Base.extend
    tmpl: app.template.get 'friends'

    show: (users) ->
      @render friends: users.toJSON()

).call myapp
