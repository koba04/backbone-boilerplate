describe "models/track", ->
  assert  = require 'power-assert'
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
    assert.ok track instanceof Base

  it "model.id is mbid", ->
    assert.ok track.id is "xxxx-yyyy-zzzz"

  describe "toJSON", ->
    it "@attr.rank as rank", ->
      assert.deepEqual track.toJSON(),
        mbid: "xxxx-yyyy-zzzz"
        name: "great song"
        "@attr":
          rank: "10"
        rank: "10"


