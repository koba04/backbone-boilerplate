( ->
  'use strict'

  view = @view
  model = @model
  collection = @collection

  @Router = Backbone.Router.extend

    routes:
      "":         "top"
      "my/":      "my"
      "friends/": "friends"

    start: -> Backbone.history.start()

    top: ->
      new view.Top().render()

    my: ->
      my = new model.User id: 1
      my.fetch success: ->
        new view.My().show my

    friends: ->
      users = new collection.Users()
      users.fetch success: ->
        new view.Friends().show users

).call myapp
