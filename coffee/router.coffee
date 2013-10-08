( (model, view, collection) ->

  'use strict'
  Router = Backbone.Router.extend

    routes:
      "":         "top"
      "my/":      "my"
      "friends/": "friends"

    top: ->
      new view.sub.Top().render()
      new view.main.Top().render()

    my: ->
      my = new model.User({ id: 1 })
      my.fetch success: ->
        data = my.toJSON()
        new view.main.Default().show data
        new view.sub.My().show data

    friends: ->
      users = new collection.Users()
      users.fetch success: ->
        new view.sub.Friends().show users.toJSON()
        my = new model.User({ id: 1 })
        my.fetch success: ->
          new view.main.Default().show my.toJSON()

  myapp.Router = new Router()
  Backbone.history.start()

).call(this, myapp.model, myapp.view, myapp.collection)
