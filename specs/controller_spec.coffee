describe "controller", ->
  assert      = require 'power-assert'
  sinon       = require 'sinon'
  $           = require 'jquery'
  App         = require 'myapp/app'
  Controller  = require 'myapp/controller'
  TopView     = require 'myapp/views/layouts/top'
  ErrorView   = require 'myapp/views/layouts/error'

  describe "constructor()", ->
    beforeEach ->
      App.vent.trigger "error"

    it "vent.trigger 'error' execute error()", ->
      assert.ok App.content.currentView instanceof ErrorView

  describe "top", ->
    beforeEach ->
      Controller.top()
    it "after fetched users, show TopView in content regions", ->
      assert.ok App.content.currentView instanceof TopView

  describe "error", ->
    beforeEach ->
      Controller.error()
    it "show ErrorView in content regions", ->
      assert.ok App.content.currentView instanceof ErrorView
