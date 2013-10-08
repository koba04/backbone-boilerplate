( (view) ->
  'use strict'

  view.SubView = view.Base.extend
    el: $('#subview')

).call(this, myapp.view)
