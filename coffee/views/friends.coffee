( ->
  'use strict'

  a = @app
  v = @view

  v.Friends = v.Base.extend
    tmpl: a.template.get 'friends'

    show: (users) ->
      @render friends: users.toJSON()

).call myapp
