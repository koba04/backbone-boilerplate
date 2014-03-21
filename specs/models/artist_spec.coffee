describe "models/artist", ->
  expect  = require 'expect.js'
  Artist  = require 'myapp/models/artist'
  Base    = require 'myapp/models/base'

  artist = null
  beforeEach ->
    artist = new Artist id: "radiohead"

  it "extends Base", ->
    expect(artist).to.be.a Base

