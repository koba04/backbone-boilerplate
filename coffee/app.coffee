do ->
  'use strict'

  # define namespace
  myapp = window.myapp
  myapp.model = {}
  myapp.collection = {}
  myapp.view =
    main: {}
    sub: {}
  myapp.util = {}

  # MyApp
  class App
  myapp.App = new App()

  # override Backbone.sync
  originalSync = Backbone.sync
  Backbone.sync = (method, model, options) ->
    originalSync method, model, options

