'use strict'

Backbone  = require 'backbone'
Base      = require 'myapp/models/base'
App       = require 'myapp/app'
tracks    = require 'myapp/collections/tracks'

module.exports = class extends Base
  urlRoot: "http://ws.audioscrobbler.com/2.0/?api_key=b867bf0fdfe95e6c6dc31a275535f765&format=json"
  fetchTopTracks: ->
    return unless @id
    Backbone.$.ajax
      dataType: "json"
      url: @urlRoot
      data:
        method: "artist.gettoptracks"
        artist: @id
    .done (data) ->
      tracks.reset data.toptracks.track
    .fail ->
      App.vent.trigger "error"
