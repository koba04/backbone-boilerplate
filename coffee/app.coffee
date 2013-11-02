( ->
  'use strict'

  myapp = @
  Storage = @util.Storage

  class App
    constructor: ->
      @template = new myapp.Template()
      @router = new myapp.Router()

    setupAjax: ->
      # setup XHR
      $.ajaxSettings.timeout = 5000
      $.ajaxSettings.cache = false
      $.ajaxSettings.xhr = ->
        xhr = new XMLHttpRequest
        # set http header to xhr
        xhr

    start: ->
      @setupAjax()
      @router.start()

  myapp.app = new App()

).call myapp
