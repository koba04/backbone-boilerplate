( (view) ->
  'use strict'

  view.SubView = view.MyApp.extend
    el: $('#subview')

).call(this, myapp.view)
