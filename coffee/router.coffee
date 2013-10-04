do ->
  'use strict'
  Router = Backbone.Router.extend

    routes:
      ""    : "top"
      "my/" : "my"

    top: ->
      new MyApp.View.Sub.Top().render()
      new MyApp.View.Main.Top().render()

    my: ->
      new MyApp.View.Main.Default().render()
      new MyApp.View.Sub.My().render()

  MyApp.Router = new Router()
  Backbone.history.start()

