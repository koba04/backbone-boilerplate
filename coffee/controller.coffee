( ->
  'use strict'

  view = @view
  model = @model
  collection = @collection

  @Controller =
    top: ->
      topView = new view.layout.Top()
      myapp.App.content.show topView

    error: ->
      errorView = new view.layout.Error()
      myapp.App.content.show errorView

    my: ->
      my = new model.User id: 1
      my.fetch success: ->
        myView = new view.layout.My model: my
        myapp.App.content.show myView

    friends: ->
      new view.layout.Friends().show()

).call myapp
