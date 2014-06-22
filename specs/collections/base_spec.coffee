describe "collections/base", ->
  assert      = require 'power-assert'
  Backbone    = require 'backbone'
  Collection  = require 'myapp/collections/base'
  Model       = require 'myapp/models/base'

  collection = null
  beforeEach ->
    collection = new Collection

  it "extends Basebone.Collection", ->
    assert.ok collection instanceof Backbone.Collection

  it "has Model.Base", ->
    assert.ok collection.model is Model

