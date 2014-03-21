'use strict'

Backbone  = require 'backbone'
template  = require 'template/items/artist_search'
artist    = require 'myapp/models/artist'

module.exports = class extends Backbone.Marionette.ItemView
  template: template
  ui:
    artist: ".js-input-artist"
  triggers:
    "submit .js-fetch-top-tracks": "fetch:top:tracks"
  onFetchTopTracks: ->
    @model.set "id", @ui.artist.val()
    @model.fetchTopTracks()

