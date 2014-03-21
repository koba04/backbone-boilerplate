describe "App", ->
  expect    = require 'expect.js'
  Backbone  = require 'backbone'
  App       = require 'myapp/app'
  Router    = require 'myapp/router'

  describe "initialize", ->
    it "App isa Backbone.Marionette.Application", ->
      expect(App).to.be.a Backbone.Marionette.Application

    it "create content region", ->
     expect(App.content).to.be.a Backbone.Marionette.Region

    it "Backbone.History is started", ->
      expect(Backbone.History.started).to.be.ok()
