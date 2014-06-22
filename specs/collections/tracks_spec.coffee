describe "collections/tracks", ->
  assert  = require 'power-assert'
  tracks  = require 'myapp/collections/tracks'
  Base    = require 'myapp/collections/base'
  Track   = require 'myapp/models/track'

  beforeEach ->
    tracks = new tracks.constructor

  it "extends collection/base", ->
    assert.ok tracks instanceof Base

  it "model is Model.User", ->
    assert.ok tracks.model is Track
