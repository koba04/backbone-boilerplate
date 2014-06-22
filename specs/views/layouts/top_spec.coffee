describe "views/layouts/top", ->
  assert            = require 'power-assert'
  sinon             = require 'sinon'
  Backbone          = require 'backbone'
  TopView           = require 'myapp/views/layouts/top'
  ArtistSearchView  = require 'myapp/views/items/artist_search'
  TracksView        = require 'myapp/views/collections/tracks'
  Artist            = require 'myapp/models/artist'
  tracks            = require 'myapp/collections/tracks'
  template          = require 'template/layouts/top'

  view = null
  beforeEach ->
    view = new TopView

  it "extends Marionette.LayoutView", ->
    assert.ok view instanceof Backbone.Marionette.LayoutView

  it "template is layouts/top", ->
    assert.ok view.template is template

  describe "onRender", ->
    beforeEach ->
      sinon.spy view, "showTracks"
      view.render()

    it "artistSearch region has artist_search view", ->
      assert.ok view.artistSearch.currentView instanceof ArtistSearchView

    it "artist_search view has models/artist", ->
      assert.ok view.artistSearch.currentView.model instanceof Artist

    it "listenTo tracks's reset event, trigger showTracks", ->
      tracks.reset []
      assert.ok view.showTracks.calledOnce

  describe "showTracks", ->
    beforeEach ->
      view.render().showTracks()

    it "topTracks region has tracks view", ->
      assert.ok view.topTracks.currentView instanceof TracksView

    it "tracks view has collections/tracks", ->
      assert.ok view.topTracks.currentView.collection is tracks

