describe "models/artist", ->
  expect    = require 'expect.js'
  sinon     = require 'sinon'
  Backbone  = require 'backbone'
  $         = require 'jquery'
  App       = require 'myapp/app'
  Artist    = require 'myapp/models/artist'
  Base      = require 'myapp/models/base'
  tracks    = require 'myapp/collections/tracks'

  artist = null
  tracks.reset []
  beforeEach ->
    artist = new Artist id: "travis"

  it "extends Base", ->
    expect(artist).to.be.a Base

  describe "fetchTopTracks", ->
    deferred = null
    beforeEach ->
      deferred = $.Deferred()
      sinon.stub Backbone.$, "ajax", -> deferred.promise()
    afterEach ->
      Backbone.$.ajax.restore()
      tracks.reset []

    it "should not request when id is empty", ->
      artist.unset "id"
      artist.fetchTopTracks()
      expect(Backbone.$.ajax.called).to.not.be.ok()

    it "request was success, tracks reset by response data", ->
      response = [
        { mbid: "xxx", title: "turn" }
        { mbid: "yyy", title: "rain" }
      ]
      deferred.resolve
        toptracks:
          track:  response
      artist.fetchTopTracks()
      expect(tracks.toJSON()).to.eql response

    it "request was failed, vent.trigger 'error'", (done) ->
      App.vent.on "error", -> done()
      deferred.reject()
      artist.fetchTopTracks()
      expect(tracks.toJSON()).to.eql []

