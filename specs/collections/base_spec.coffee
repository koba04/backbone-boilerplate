describe "Collection.Base", ->

  Collection  = require 'myapp/collections/base'
  Model       = require 'myapp/models/base'

  collection = null
  beforeEach ->
    collection = new Collection

  it "extends Basebone.Collection", ->
    expect(collection).to.be.a Backbone.Collection

  it "has Model.Base", ->
    expect(collection.model).to.be Model

