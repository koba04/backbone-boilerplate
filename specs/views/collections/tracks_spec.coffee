describe "views/collections/tracks", ->
  assert      = require 'power-assert'
  Backbone    = require 'backbone'
  TracksView  = require 'myapp/views/collections/tracks'
  TrackView    = require 'myapp/views/items/track'

  view = null
  beforeEach ->
    view = new TracksView

  it "exnteds Marionette.CollectionView", ->
    assert.ok view instanceof Backbone.Marionette.CollectionView

  it "has views/items/track as childView", ->
    assert.ok view.childView is TrackView

