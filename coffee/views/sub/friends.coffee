( ->
  'use strict'

  a = @app
  v = @view

  v.sub.Friends = v.SubView.extend
    tmpl: a.template.get 'sub/friends'

    show: (users) ->
      @render friends: users.toJSON()

).call myapp
