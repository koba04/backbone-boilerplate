( ->
  'use strict'

  v = @view

  v.SubView = v.Base.extend
    el: $('#subview')

).call myapp
