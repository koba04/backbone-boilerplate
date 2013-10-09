( (util, JST) ->
  'use strict'

  class App
    constructor: ->
      # clean up storage
      util.Storage.clear()
      @setupAjax()
      @setupTemplate()

    setupAjax: ->
      # setup XHR
      $.ajaxSettings.timeout = 5000
      $.ajaxSettings.cache = false
      $.ajaxSettings.xhr = ->
        xhr = new XMLHttpRequest()
        # set http header to xhr
        xhr

    setupTemplate: ->

      # helper
      Handlebars.registerHelper 'upperCase', (str) -> str.upperCase()

      # particle
      Handlebars.registerPartial 'user', JST['particle/user']

  myapp.App = new App()

).call(this,  myapp.util, myapp.JST)
