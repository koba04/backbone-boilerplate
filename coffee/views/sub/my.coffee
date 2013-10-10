( ->
  'use strict'

  a = @app
  v = @view

  v.sub.My = v.SubView.extend
    tmpl: a.template.get 'sub/my'

    show: (user) ->
      @render user: user.toJSON()
).call myapp
