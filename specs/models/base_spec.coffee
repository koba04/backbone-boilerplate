describe "models/base", ->
  assert    = require 'power-assert'
  Backbone  = require 'backbone'
  Base      = require 'myapp/models/base'

  model = null
  beforeEach ->
    model = new Base

  it "extends Basebone.Model", ->
    assert.ok model instanceof Backbone.Model

