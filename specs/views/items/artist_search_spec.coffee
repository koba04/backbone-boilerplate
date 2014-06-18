describe "views/items/artist_search", ->
  expect            = require 'expect.js'
  sinon             = require 'sinon'
  Backbone          = require 'backbone'
  Artist            = require 'myapp/models/artist'
  ArtistSearchView  = require 'myapp/views/items/artist_search'
  template          = require 'template/items/artist_search'

  view = null
  beforeEach ->
    view = new ArtistSearchView model: new Artist

  it "extends Marionette.ItemView", ->
    expect(view).to.be.a Backbone.Marionette.ItemView

  it "template is items/artist_search", ->
    expect(view.template).to.be template

  describe "onFetchTopTracks", ->
    beforeEach ->
      view.ui.artist = val: -> "weezer"
      sinon.stub view.model, "fetchTopTracks"
      view.onFetchTopTracks()
    afterEach ->
      view.model.fetchTopTracks.restore()

    it "should set input value to model.id", ->
      expect(view.model.id).to.be "weezer"

    it "should call model.fetchTopTracks", ->
      expect(view.model.fetchTopTracks.calledOnce).to.be.ok()
