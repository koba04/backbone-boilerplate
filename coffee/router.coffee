do ->
  'use strict'
  Router = Backbone.Router.extend

    routes:
      "":         "top"
      "my/":      "my"
      "friends/": "friends"

    top: ->
      new MyApp.View.Sub.Top().render()
      new MyApp.View.Main.Top().render()

    my: ->
      my = new MyApp.Model.User({ id: 1 })
      my.fetch
        success: ->
          data = my.toJSON()
          new MyApp.View.Main.Default().show data
          new MyApp.View.Sub.My().show data

    friends: ->
      users = new MyApp.Collection.Users()
      users.fetch
        success: ->
          new MyApp.View.Sub.Friends().show users.toJSON()
          my = new MyApp.Model.User({ id: 1 })
          my.fetch
            success: ->
              new MyApp.View.Main.Default().show my.toJSON()

  MyApp.Router = new Router()
  Backbone.history.start()

