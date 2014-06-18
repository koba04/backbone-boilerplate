'use strict'

$           = require 'jquery'
Backbone    = require 'backbone'

class App extends Backbone.Marionette.Application
  constructor: ->
    super
    @addInitializer (options) =>
      @addRegions content: "#js-content"
      # setup XHR
      $.ajaxSettings.timeout = 5000
      $.ajaxSettings.cache = false
    @on "start", (options) ->
      unless Backbone.History.started
        Backbone.history.start()

    $ => @start()

module.exports = new App
