( (util) ->
  'use strict'

  class App
    constructor: ->
      # clean up storage
      util.Storage.clear()

      # setup XHR
      $.ajaxSettings.timeout = 5000
      $.ajaxSettings.cache = false
      $.ajaxSettings.xhr = ->
        xhr = new XMLHttpRequest()
        # set http header to xhr
        xhr

  myapp.App = new App()

).call(this,  myapp.util)
