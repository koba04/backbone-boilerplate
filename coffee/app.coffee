( (util) ->
  'use strict'

  class App
    constructor: ->
      @template = new myapp.Template()
      @router = new myapp.Router()

    setupAjax: ->
      # setup XHR
      $.ajaxSettings.timeout = 5000
      $.ajaxSettings.cache = false
      $.ajaxSettings.xhr = ->
        xhr = new XMLHttpRequest()
        # set http header to xhr
        xhr

    start: ->
      # clean up storage
      util.Storage.clear()
      @setupAjax()
      @router.start()

  myapp.app = new App()

).call(this,  myapp.util)
