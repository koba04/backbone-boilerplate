( ->
  'use strict'

  view = @view

  class view.My extends view.Base
    tmpl: JST['my']
    show: (user) ->
      @render user: user.toJSON()
).call myapp
