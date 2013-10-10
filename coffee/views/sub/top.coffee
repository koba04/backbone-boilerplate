( (SubView, sub, app) ->
  'use strict'

  sub.Top = SubView.extend
    tmpl: app.template.get 'sub/top'

).call(this, myapp.view.SubView,  myapp.view.sub, myapp.app)
