'use strict'

App         = require 'myapp/app'
TopView     = require 'myapp/views/layouts/top'
ErrorView   = require 'myapp/views/layouts/error'

class Controller
  constructor: ->
    App.vent.on "error", @error
  top: ->
    App.content.show new TopView
  error: ->
    App.content.show new ErrorView()

module.exports = new Controller
