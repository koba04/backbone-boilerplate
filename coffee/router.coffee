do ->
  'use strict'
  MyApp.Router = Backbone.Router.extend
    routes:
      "": "top"
    top: ->
      new MyApp.View.Main.Default().render()
      new MyApp.View.Sub.Top().render()

  router = new MyApp.Router()
  Backbone.history.start()

