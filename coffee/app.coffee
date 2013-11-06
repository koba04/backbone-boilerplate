( ->
  'use strict'

  myapp = @

  setupAjax = ->
    # setup XHR
    $.ajaxSettings.timeout = 5000
    $.ajaxSettings.cache = false

  App = new Backbone.Marionette.Application()
  App.addInitializer ->
    @router = new myapp.Router()
    setupAjax()
  App.addRegions content: "#content"

  myapp.App = App

).call myapp
