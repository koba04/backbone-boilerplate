( ->
  'use strict'

  a = @app
  v = @view

  v.My = v.Base.extend
    tmpl: a.template.get 'my'

    show: (user) ->
      @render user: user.toJSON()
).call myapp
