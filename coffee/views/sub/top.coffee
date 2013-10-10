( ->
  'use strict'

  a = @app
  v = @view

  v.sub.Top = v.SubView.extend
    tmpl: a.template.get 'sub/top'

).call myapp
