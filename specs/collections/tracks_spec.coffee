describe "collections/tracks", ->
  expect  = require 'expect.js'
  tracks  = require 'myapp/collections/tracks'
  Base    = require 'myapp/collections/base'
  Track   = require 'myapp/models/track'

  beforeEach ->
    tracks = new tracks.constructor

  it "extends collection/base", ->
    expect(tracks).to.be.a Base

  it "model is Model.User", ->
    expect(tracks.model).to.be Track
