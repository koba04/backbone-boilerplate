( ->
  'use strict'

  view = @view

  class view.Friends extends view.Base
    tmpl: JST['friends']
    show: (users) ->
      @render friends: users.toJSON()

).call myapp
