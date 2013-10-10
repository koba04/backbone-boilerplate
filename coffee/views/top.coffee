( ->
  'use strict'

  a = @app
  v = @view

  v.Top = v.Base.extend
    tmpl: a.template.get 'top'

).call myapp
