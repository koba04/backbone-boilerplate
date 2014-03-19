'use strict'

$           = require 'jquery'
Backbone    = require 'backbone'

class App extends Backbone.Marionette.Application
  constructor: ->
    super
    @addInitializer (options) =>
      @addRegions content: "#content"
      # setup XHR
      $.ajaxSettings.timeout = 5000
      $.ajaxSettings.cache = false
    @on "initialize:after", (options) ->
      unless Backbone.History.started
        Backbone.history.start()

    $ => @start()

module.exports = new App
