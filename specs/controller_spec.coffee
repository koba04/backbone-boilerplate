describe "controller", ->
  expect      = require 'expect.js'
  sinon       = require 'sinon'
  $           = require 'jquery'
  App         = require 'myapp/app'
  Controller  = require 'myapp/controller'
  TopView     = require 'myapp/views/layouts/top'
  ErrorView   = require 'myapp/views/layouts/error'

  describe "constructor", ->
    beforeEach ->
      App.vent.trigger "error"

    it "vent.trigger 'error' execute error()", ->
      expect(App.content.currentView).to.be.a ErrorView

  describe "top", ->
    beforeEach ->
      Controller.top()
    it "after fetched users, show TopView in content regions", ->
      expect(App.content.currentView).to.be.a TopView

  describe "error", ->
    beforeEach ->
      Controller.error()
    it "show ErrorView in content regions", ->
      expect(App.content.currentView).to.be.a ErrorView
