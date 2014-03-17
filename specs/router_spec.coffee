describe "Router", ->

  router      = require 'myapp/router'
  Controller  = require 'myapp/controller'

  it "extends Marionette.AppRouter", ->
    expect(router).to.be.a Backbone.Marionette.AppRouter

  it "has Controller", ->
    expect(router.controller).to.be Controller

