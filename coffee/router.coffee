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
      MyApp.Util.Http.get('/api/my/').next (data) ->
        new MyApp.View.Main.Default().show(data)
        new MyApp.View.Sub.My().show(data)

    friends: ->
      MyApp.Util.Http.get('/api/users/').next (data) ->
        new MyApp.View.Sub.Friends().show(data)
        # TODO: Cache
        MyApp.Util.Http.get('/api/my/').next (data) ->
          new MyApp.View.Main.Default().show(data)

  MyApp.Router = new Router()
  Backbone.history.start()

