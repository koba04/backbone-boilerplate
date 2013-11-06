( ->
  'use strict'

  view = @view
  model = @model
  collection = @collection

  @Controller =
    top: ->
      v = new view.layout.Top()
      myapp.App.content.show v

    error: ->
      v = new view.layout.Error()
      myapp.App.content.show v

    my: ->
      my = new model.User id: 1
      my.fetch success: ->
        v = new view.layout.My model: my
        myapp.App.content.show v

    friends: ->
      users = new collection.Users()
      users.fetch success: ->
        v = new view.layout.Friends collection: users
        myapp.App.content.show v

).call myapp
