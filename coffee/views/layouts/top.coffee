'use strict'

Backbone          = require 'backbone'
ArtistSearchView  = require 'myapp/views/items/artist_search'
TracksView        = require 'myapp/views/collections/tracks'
Artist            = require 'myapp/models/artist'
tracks            = require 'myapp/collections/tracks'
template          = require 'template/layouts/top'

module.exports = class extends Backbone.Marionette.LayoutView
  template: template
  regions:
    artistSearch: ".js-artist-search"
    topTracks:    ".js-top-tracks"

  onRender: ->
    @artistSearch.show new ArtistSearchView model: new Artist
    @listenTo tracks, 'reset', @showTracks

  showTracks: ->
    @topTracks.show new TracksView collection: tracks

