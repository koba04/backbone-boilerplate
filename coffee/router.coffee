( (model, view, collection) ->

  'use strict'
  myapp.Router = Backbone.Router.extend

    routes:
      "":         "top"
      "my/":      "my"
      "friends/": "friends"

    start: -> Backbone.history.start()

    top: ->
      new view.sub.Top().render()
      new view.main.Top().render()

    my: ->
      my = new model.User id: 1
      my.fetch success: ->
        new view.main.Default().show my
        new view.sub.My().show my

    friends: ->
      users = new collection.Users()
      users.fetch success: ->
        new view.sub.Friends().show users
        my = new model.User id: 1
        my.fetch success: ->
          new view.main.Default().show my

).call(this, myapp.model, myapp.view, myapp.collection)
