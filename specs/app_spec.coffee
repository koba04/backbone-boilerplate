describe "app", ->
  assert    = require 'power-assert'
  Backbone  = require 'backbone'
  App       = require 'myapp/app'
  Router    = require 'myapp/router'

  describe "initialize", ->
    it "App isa Backbone.Marionette.Application", ->
      assert.ok App instanceof Backbone.Marionette.Application

    it "create content region", ->
     assert.ok App.content instanceof Backbone.Marionette.Region

    it "Backbone.History is started", ->
      assert.ok Backbone.History.started
