describe "views/items/artist_search", ->
  assert            = require 'power-assert'
  sinon             = require 'sinon'
  Backbone          = require 'backbone'
  Artist            = require 'myapp/models/artist'
  ArtistSearchView  = require 'myapp/views/items/artist_search'
  template          = require 'template/items/artist_search'

  view = null
  beforeEach ->
    view = new ArtistSearchView model: new Artist

  it "extends Marionette.ItemView", ->
    assert.ok view instanceof Backbone.Marionette.ItemView

  it "template is items/artist_search", ->
    assert.ok view.template is template

  describe "onFetchTopTracks", ->
    beforeEach ->
      view.ui.artist = val: -> "weezer"
      sinon.stub view.model, "fetchTopTracks"
      view.onFetchTopTracks()
    afterEach ->
      view.model.fetchTopTracks.restore()

    it "should set input value to model.id", ->
      assert.ok view.model.id is "weezer"

    it "should call model.fetchTopTracks", ->
      assert.ok view.model.fetchTopTracks.calledOnce
