( ->
  'use strict'

  app = @app
  view = @view

  class view.Friends extends view.Base
    tmpl: app.template.get 'friends'
    show: (users) ->
      @render friends: users.toJSON()

).call myapp
