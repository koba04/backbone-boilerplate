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

  myapp.App = App

).call myapp
