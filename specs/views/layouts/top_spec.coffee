describe "views/layouts/top", ->
  expect            = require 'expect.js'
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

  it "extends Marionette.Layout", ->
    expect(view).to.be.a Backbone.Marionette.Layout

  it "template is layouts/top", ->
    expect(view.template).to.be template

  describe "onRender", ->
    beforeEach ->
      sinon.spy view, "showTracks"
      view.onRender()

    it "artistSearch region has artist_search view", ->
      expect(view.artistSearch.currentView).to.be.a ArtistSearchView

    it "artist_search view has models/artist", ->
      expect(view.artistSearch.currentView.model).to.be.a Artist

    it "listenTo tracks's reset event, trigger showTracks", ->
      tracks.reset []
      expect(view.showTracks.calledOnce).to.be.ok()

  describe "showTracks", ->
    beforeEach ->
      view.showTracks()

    it "topTracks region has tracks view", ->
      expect(view.topTracks.currentView).to.be.a TracksView

    it "tracks view has collections/tracks", ->
      expect(view.topTracks.currentView.collection).to.be tracks

