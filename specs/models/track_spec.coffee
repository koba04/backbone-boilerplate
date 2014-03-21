describe "models/track", ->
  expect  = require 'expect.js'
  Track   = require 'myapp/models/track'
  Base    = require 'myapp/models/base'

  track = null
  beforeEach ->
    track = new Track
      mbid: "xxxx-yyyy-zzzz"
      name: "great song"
      "@attr":
        rank: "10"

  it "extends Base", ->
    expect(track).to.be.a Base

  it "model.id is mbid", ->
    expect(track.id).to.be "xxxx-yyyy-zzzz"

  describe "toJSON", ->
    it "@attr.rank as rank", ->
      expect(track.toJSON()).to.eql
        mbid: "xxxx-yyyy-zzzz"
        name: "great song"
        "@attr":
          rank: "10"
        rank: "10"


