( (util) ->
  'use strict'

  class App
    constructor: ->
      # clean up storage
      util.Storage.clear()

  myapp.App = new App()

).call(this,  myapp.util)
