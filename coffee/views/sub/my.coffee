( (SubView, sub, app) ->
  'use strict'

  sub.My = SubView.extend
    tmpl: app.template.get 'sub/my'

    show: (user) ->
      @render user: user.toJSON()
).call(this, myapp.view.SubView,  myapp.view.sub, myapp.app)
