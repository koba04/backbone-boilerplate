describe "model.Base", ->
  expect    = require 'expect.js'
  Backbone  = require 'backbone'
  Base      = require 'myapp/models/base'

  model = null
  beforeEach ->
    model = new Base

  it "extends Basebone.Model", ->
    expect(model).to.be.a Backbone.Model

