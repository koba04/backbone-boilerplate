( ->
  'use strict'

  view = @view
  model = @model
  collection = @collection

  @Controller =
    top: ->
      new view.Top().render()

    error: ->
      new view.Error().render()

    my: ->
      my = new model.User id: 1
      my.fetch success: ->
        new view.My().show my

    friends: ->
      users = new collection.Users()
      users.fetch success: ->
        new view.Friends().show users

).call myapp
