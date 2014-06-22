describe "router", ->
  assert      = require 'power-assert'
  Backbone    = require 'backbone'
  router      = require 'myapp/router'
  Controller  = require 'myapp/controller'

  it "extends Marionette.AppRouter", ->
    assert.ok router instanceof Backbone.Marionette.AppRouter

  it "has Controller", ->
    assert.ok router.controller is Controller

