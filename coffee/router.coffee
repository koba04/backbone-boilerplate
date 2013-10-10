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
      new v.Top().render()

    my: ->
      my = new m.User id: 1
      my.fetch success: ->
        new v.My().show my

    friends: ->
      users = new c.Users()
      users.fetch success: ->
        new v.Friends().show users

).call myapp, Backbone
