( (Backbone) ->
  'use strict'

  v = @view
  m = @model
  c = @collection

  @Router = Backbone.Router.extend

    routes:
      "":         "top"
      "my/":      "my"
      "friends/": "friends"

    start: -> Backbone.history.start()

    top: ->
      new v.sub.Top().render()
      new v.main.Top().render()

    my: ->
      my = new m.User id: 1
      my.fetch success: ->
        new v.main.Default().show my
        new v.sub.My().show my

    friends: ->
      users = new c.Users()
      users.fetch success: ->
        new v.sub.Friends().show users
        my = new m.User id: 1
        my.fetch success: ->
          new v.main.Default().show my

).call myapp, Backbone
