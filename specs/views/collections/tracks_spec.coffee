describe "views/collections/tracks", ->
  expect      = require 'expect.js'
  Backbone    = require 'backbone'
  TracksView  = require 'myapp/views/collections/tracks'
  TrackView    = require 'myapp/views/items/track'

  view = null
  beforeEach ->
    view = new TracksView

  it "exnteds Marionette.CollectionView", ->
    expect(view).to.be.a Backbone.Marionette.CollectionView

  it "has views/items/track as ItemView", ->
    expect(view.itemView).to.be TrackView

